import { useState, useEffect, useRef } from "react";
import { Atom, UploadSimple, Check, Spinner } from "@phosphor-icons/react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281`;

/**
 * TuringMascot — loads the mascot image from Supabase Storage.
 * Falls back to the Atom icon if no image has been uploaded yet.
 *
 * Props:
 *  - size: pixel size of the container (default 120)
 *  - showUpload: show an upload button overlay (for admin/design-system pages)
 *  - className: extra wrapper classes
 */
export function TuringMascot({
  size = 120,
  showUpload = false,
  className = "",
}: {
  size?: number;
  showUpload?: boolean;
  className?: string;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchUrl = async () => {
    try {
      const res = await fetch(`${BASE}/assets/turing-mascot`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) setUrl(data.url);
      }
    } catch {
      // no mascot uploaded yet — will show fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("name", "turing-mascot");
      const res = await fetch(`${BASE}/assets/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
        body: fd,
      });
      if (res.ok) {
        setJustUploaded(true);
        setTimeout(() => setJustUploaded(false), 2000);
        // Re-fetch the signed URL
        await fetchUrl();
      } else {
        const err = await res.json();
        console.error("[TuringMascot] Upload failed:", err);
      }
    } catch (err) {
      console.error("[TuringMascot] Upload exception:", err);
    } finally {
      setUploading(false);
    }
  };

  const iconSize = Math.round(size * 0.53);

  return (
    <div className={`relative group ${className}`} style={{ width: size, height: size }}>
      {loading ? (
        <div className="w-full h-full rounded-[16px] bg-[#F6F7F9] border border-[#DDE3EC] flex items-center justify-center">
          <Spinner size={iconSize * 0.5} className="text-[#8C8CD4] animate-spin" />
        </div>
      ) : url ? (
        <img
          src={url}
          alt="Turing Mascot"
          className="w-full h-full object-contain rounded-[16px]"
          onError={() => setUrl(null)}
        />
      ) : (
        <div className="w-full h-full rounded-[16px] bg-[#F6F7F9] border border-[#DDE3EC] flex items-center justify-center">
          <Atom size={iconSize} weight="duotone" className="text-[#8C8CD4]" />
        </div>
      )}

      {/* Upload overlay */}
      {showUpload && (
        <>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 rounded-[16px] bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            title="Upload mascote Turing"
          >
            {uploading ? (
              <Spinner size={24} className="text-white animate-spin" />
            ) : justUploaded ? (
              <Check size={24} weight="bold" className="text-white" />
            ) : (
              <UploadSimple size={24} weight="bold" className="text-white" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
