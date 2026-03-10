/* ================================================================== */
/* Dash Chart Renderer — Componente unificado e corrigido            */
/* ================================================================== */

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

const COLORS = ['#07ABDE', '#EAC23D', '#3CCEA7', '#FF8C76', '#4E6987', '#F56233'];

interface ChartRendererProps {
  data: any[];
  config: {
    chartType: string;
    rowShelf: any[];
    colShelf: any[];
  };
  tableMeta?: {
    label: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  } | null;
}

export function DashChartRenderer({ 
  data, 
  config,
  tableMeta 
}: ChartRendererProps) {
  const chartType = config.chartType;
  const allFields = [...(config.rowShelf || []), ...(config.colShelf || [])];

  // 1. Prevenção de quebra se não houver dados
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full border border-dashed border-gray-200 rounded-md">
        <p className="text-[#98989D]" style={{ fontSize: 14, ...ff }}>
          Nenhum dado disponível. Adicione campos às prateleiras.
        </p>
      </div>
    );
  }

  // Identifica quem é dimensão (Eixo X) e quem é medida (Valores)
  const dimensionField = allFields.find(
    (f) => f.field.type === "dimension" || f.field.type === "date"
  );
  const measureFields = allFields.filter((f) => f.field.type === "measure");

  // 2. Prevenção se o usuário ainda não colocou uma medida (não tem o que desenhar)
  if (measureFields.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-[#98989D]" style={{ fontSize: 14, ...ff }}>
          Adicione uma medida (Measure) para visualizar o gráfico.
        </p>
      </div>
    );
  }

  // DEBUG: Isso vai te ajudar a ver no console se as chaves batem
  console.log("[DEBUG] Chaves do primeiro objeto de dado:", Object.keys(data[0]));
  console.log("[DEBUG] Chaves que o Recharts está procurando:", measureFields.map(m => m.field.name));

  // O eixo X usa o nome da dimensão, ou um índice genérico se não houver dimensão
  const xAxisKey = dimensionField ? dimensionField.field.name : undefined;

  // Gráfico de Barras
  if (chartType === "bar") {
    return (
      // A div em volta garante que o ResponsiveContainer não colapse para 0px
      <div style={{ width: '100%', height: '500px', minWidth: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DDE3EC" vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "#28415C", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#28415C", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #DDE3EC", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            
            {/* CORREÇÃO DAS CORES: Usa a paleta COLORS para diferenciar múltiplas barras */}
            {measureFields.map((field, index) => (
              <Bar
                key={field.field.name}
                dataKey={field.field.name}
                fill={tableMeta?.color && measureFields.length === 1 ? tableMeta.color : COLORS[index % COLORS.length]}
                name={field.field.label}
                radius={[4, 4, 0, 0]} // Deixa a ponta da barra arredondada, fica mais bonito
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Gráfico de Linhas
  if (chartType === "line") {
    return (
      <div style={{ width: '100%', height: '500px', minWidth: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DDE3EC" vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "#28415C", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#28415C", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #DDE3EC", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {measureFields.map((field, index) => (
              <Line
                key={field.field.name}
                type="monotone"
                dataKey={field.field.name}
                stroke={tableMeta?.color && measureFields.length === 1 ? tableMeta.color : COLORS[index % COLORS.length]}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name={field.field.label}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Gráfico de Pizza
  if (chartType === "pie") {
    const measureField = measureFields[0];

    if (!dimensionField) {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-[#98989D]" style={{ fontSize: 14, ...ff }}>
            O gráfico de pizza requer 1 dimensão e 1 medida.
          </p>
        </div>
      );
    }

    return (
      <div style={{ width: '100%', height: '500px', minWidth: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={measureField.field.name}
              nameKey={dimensionField.field.name}
              cx="50%"
              cy="50%"
              outerRadius={150}
              innerRadius={70} // Transforma a pizza numa rosca (Donut Chart) - visualmente mais moderno
              paddingAngle={2}
              label={(entry) => `${entry[dimensionField.field.name]}: ${formatNumber ? formatNumber(entry[measureField.field.name]) : entry[measureField.field.name]}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #DDE3EC", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-[#98989D]" style={{ fontSize: 14, ...ff }}>
        Tipo de gráfico não suportado: {chartType}
      </p>
    </div>
  );
}