/* ================================================================== */
/*  Zenite Dash — TanStack Data Table                                  */
/*  Sortable, paginated, searchable, with drill-down callbacks         */
/* ================================================================== */

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { motion } from "motion/react";
import { MagnifyingGlass, SortAscending, SortDescending, CaretLeft, CaretRight, Export } from "@phosphor-icons/react";
import { exportToCSV } from "./dash-export-utils";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  title?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  exportFilename?: string;
  exportColumns?: { key: string; label: string }[];
}

export function DashDataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  pageSize = 15,
  onRowClick,
  exportFilename,
  exportColumns,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

  const handleExport = () => {
    if (!exportFilename) return;
    const rows = table.getFilteredRowModel().rows.map(r => r.original);
    exportToCSV(rows as any[], exportFilename, exportColumns);
  };

  return (
    <div className="bg-white rounded-[16px] border border-[#DDE3EC] overflow-hidden" style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {title && (
            <span className="text-[#122232] shrink-0" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
              {title}
            </span>
          )}
          <div className="flex items-center gap-2 h-[34px] px-3 bg-[#F6F7F9] rounded-[10px] border border-[#EEF1F6] flex-1 max-w-[260px]">
            <MagnifyingGlass size={14} className="text-[#C8CFDB] shrink-0" />
            <input
              type="text"
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Buscar..."
              className="flex-1 bg-transparent border-none outline-none text-[#122232] placeholder-[#C8CFDB]"
              style={{ fontSize: 12, fontWeight: 400, letterSpacing: -0.3, ...ff }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
            {totalRows} registro{totalRows !== 1 ? "s" : ""}
          </span>
          {exportFilename && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 h-[30px] px-3 rounded-full bg-[#F6F7F9] border border-[#EEF1F6] text-[#4E6987] hover:bg-[#DDE3EC] transition-colors cursor-pointer"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, ...ff }}
            >
              <Export size={12} weight="duotone" />
              CSV
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-y border-[#EEF1F6]">
              {table.getHeaderGroups().map(hg =>
                hg.headers.map(header => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`px-4 py-2.5 text-left select-none ${header.column.getCanSort() ? "cursor-pointer hover:bg-[#F6F7F9]" : ""}`}
                      style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === "asc" && <SortAscending size={10} weight="bold" className="text-[#0483AB]" />}
                        {sorted === "desc" && <SortDescending size={10} weight="bold" className="text-[#0483AB]" />}
                      </div>
                    </th>
                  );
                })
              )}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: idx * 0.01 }}
                onClick={() => onRowClick?.(row.original)}
                className={`border-t border-[#EEF1F6] transition-colors ${onRowClick ? "cursor-pointer hover:bg-[#DCF0FF]/30" : "hover:bg-[#F6F7F9]"}`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#EEF1F6]">
          <span className="text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
            {pageIndex * currentPageSize + 1}–{Math.min((pageIndex + 1) * currentPageSize, totalRows)} de {totalRows}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center justify-center w-[28px] h-[28px] rounded-full border border-[#DDE3EC] text-[#4E6987] hover:bg-[#F6F7F9] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <CaretLeft size={12} weight="bold" />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let page: number;
              if (totalPages <= 7) page = i;
              else if (pageIndex < 4) page = i;
              else if (pageIndex > totalPages - 5) page = totalPages - 7 + i;
              else page = pageIndex - 3 + i;
              return (
                <button
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={`flex items-center justify-center w-[28px] h-[28px] rounded-full transition-colors cursor-pointer ${
                    page === pageIndex ? "bg-[#28415c] text-white" : "text-[#4E6987] hover:bg-[#F6F7F9]"
                  }`}
                  style={{ fontSize: 11, fontWeight: page === pageIndex ? 700 : 500, ...ff }}
                >
                  {page + 1}
                </button>
              );
            })}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center justify-center w-[28px] h-[28px] rounded-full border border-[#DDE3EC] text-[#4E6987] hover:bg-[#F6F7F9] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <CaretRight size={12} weight="bold" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
