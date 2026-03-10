import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const SERVER_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281`;

interface TuringMessage {
  id: string;
  role: "user" | "turing";
  content: string;
  type?: "text" | "query" | "error";
  insight?: string;
  explanation?: string;
  chartType?: string;
  chartTitle?: string;
  suggestions?: string[];
  data?: Record<string, unknown>[];
}

interface TuringResponse {
  type: "text" | "query" | "error";
  message?: string;
  insight?: string;
  explanation?: string;
  chart_type?: string;
  chart_title?: string;
  suggestions?: string[];
}

export function useTuring() {
  const [messages, setMessages] = useState<TuringMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildHistory = (msgs: TuringMessage[]) =>
    msgs.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

  const ask = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    setError(null);
    const userMsg: TuringMessage = { id: crypto.randomUUID(), role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    try {
      // Try authenticated session first, fallback to anon key
      let accessToken = publicAnonKey;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) accessToken = session.access_token;
      } catch {
        // No auth session — use anon key
      }
      const response = await fetch(
        `${SERVER_BASE}/turing-ask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify({ message: userMessage, history: buildHistory(messages) }),
        }
      );
      if (!response.ok) throw new Error("Erro na resposta do Turing");
      const result = await response.json();
      const turing: TuringResponse = result.turing;
      const turingMsg: TuringMessage = {
        id: crypto.randomUUID(), role: "turing",
        content: turing.message ?? turing.insight ?? "Analise concluida.",
        type: turing.type, insight: turing.insight, explanation: turing.explanation,
        chartType: turing.chart_type, chartTitle: turing.chart_title,
        suggestions: turing.suggestions, data: result.data,
      };
      setMessages((prev) => [...prev, turingMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "turing", content: "Nao consegui processar sua pergunta. Tente novamente.", type: "error" }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearHistory = useCallback(() => setMessages([]), []);
  return { messages, isLoading, error, ask, clearHistory };
}