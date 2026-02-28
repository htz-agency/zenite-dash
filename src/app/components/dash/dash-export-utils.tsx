/* ================================================================== */
/*  Zenite Dash — Export Utilities (CSV, PDF)                          */
/* ================================================================== */

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* ── CSV Export ── */
export function exportToCSV(data: Record<string, any>[], filename: string, columns?: { key: string; label: string }[]) {
  if (!data.length) return;
  const cols = columns || Object.keys(data[0]).map(k => ({ key: k, label: k }));
  const header = cols.map(c => `"${c.label}"`).join(",");
  const rows = data.map(row =>
    cols.map(c => {
      const val = row[c.key];
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    }).join(",")
  );
  const csv = "\uFEFF" + [header, ...rows].join("\n"); // BOM for Excel UTF-8
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

/* ── PDF Export (capture a DOM element) ── */
export async function exportToPDF(element: HTMLElement, filename: string, title?: string) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? "landscape" : "portrait",
    unit: "mm",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxWidth = pageWidth - margin * 2;

  if (title) {
    pdf.setFontSize(16);
    pdf.setTextColor(18, 34, 50);
    pdf.text(title, margin, margin + 6);
    pdf.setFontSize(9);
    pdf.setTextColor(152, 152, 157);
    pdf.text(`Zenite Dash · Gerado em ${new Date().toLocaleString("pt-BR")}`, margin, margin + 12);
  }

  const yOffset = title ? margin + 18 : margin;
  const imgWidth = maxWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // If content is taller than one page, scale to fit
  const availableHeight = pageHeight - yOffset - margin;
  const finalWidth = imgHeight > availableHeight ? (availableHeight * imgWidth) / imgHeight : imgWidth;
  const finalHeight = imgHeight > availableHeight ? availableHeight : imgHeight;

  pdf.addImage(imgData, "PNG", margin, yOffset, finalWidth, finalHeight);
  pdf.save(`${filename}.pdf`);
}

/* ── Helper ── */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
