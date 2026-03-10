import { createBrowserRouter } from "react-router";
import { DashLayout } from "./components/dash/dash-layout";
import { DashHome } from "./components/dash/dash-home";
import { DashOverview } from "./components/dash/dash-overview";
import { DashVendas } from "./components/dash/dash-vendas";
import { DashPipeline } from "./components/dash/dash-pipeline";
import { DashAtividades } from "./components/dash/dash-atividades";
import { DashPerformance } from "./components/dash/dash-performance";
import { DashConversao } from "./components/dash/dash-conversao";
import { DashTabelas } from "./components/dash/dash-tabelas";
import { DashObjetos } from "./components/dash/dash-objetos";
import { DashRelatorios } from "./components/dash/dash-relatorios";
import { DashBuilder } from "./components/dash/dash-builder";
import { DashVisualBuilder } from "./components/dash/dash-visual-builder";
import { DashDesignSystem } from "./components/dash/dash-design-system";
import { DashSyncConfig } from "./components/dash/dash-sync-config";
import { DashDashboardsList } from "./components/dash/dash-dashboards-list";
import { DashRelatoriosList } from "./components/dash/dash-relatorios-list";
import { DashReportView } from "./components/dash/dash-report-view";
import { DashDashboardBuilder } from "./components/dash/dash-dashboard-composer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashLayout,
    children: [
      { index: true, Component: DashHome },
      {
        path: "dashboards",
        children: [
          { path: "overview", Component: DashOverview },
          { path: "vendas", Component: DashVendas },
          { path: "pipeline", Component: DashPipeline },
          { path: "atividades", Component: DashAtividades },
          { path: "performance", Component: DashPerformance },
          { path: "conversao", Component: DashConversao },
          { path: "builder", Component: DashBuilder },
        ],
      },
      {
        path: "explorador",
        children: [
          { path: "tabelas", Component: DashTabelas },
          { path: "objetos", Component: DashObjetos },
        ],
      },
      {
        path: "estudio",
        children: [
          { path: "visual", Component: DashVisualBuilder },
          { path: "painel", Component: DashDashboardBuilder },
          { path: "dashboards/recentes", Component: DashDashboardsList },
          { path: "dashboards/criados-por-mim", Component: DashDashboardsList },
          { path: "dashboards/privados", Component: DashDashboardsList },
          { path: "dashboards/publicos", Component: DashDashboardsList },
          { path: "dashboards/todos", Component: DashDashboardsList },
          { path: "relatorios/recentes", Component: DashRelatorios },
          { path: "relatorios/recentes/:id", Component: DashReportView },
          { path: "relatorios/criados-por-mim", Component: DashRelatorios },
          { path: "relatorios/criados-por-mim/:id", Component: DashReportView },
          { path: "relatorios/privados", Component: DashRelatorios },
          { path: "relatorios/privados/:id", Component: DashReportView },
          { path: "relatorios/publicos", Component: DashRelatorios },
          { path: "relatorios/publicos/:id", Component: DashReportView },
          { path: "relatorios/todos", Component: DashRelatorios },
          { path: "relatorios/todos/:id", Component: DashReportView },
        ],
      },
      { path: "relatorios", Component: DashRelatorios },
      { path: "design-system", Component: DashDesignSystem },
      { path: "sync-config", Component: DashSyncConfig },
      { path: "*", Component: DashHome },
    ],
  },
]);