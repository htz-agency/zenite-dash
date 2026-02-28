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
      { path: "relatorios", Component: DashRelatorios },
      { path: "*", Component: DashHome },
    ],
  },
]);