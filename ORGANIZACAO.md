# 📂 ORGANIZAÇÃO DO APP DASH - ZENITE CRM

## 🏗️ ARQUITETURA GERAL

```
┌─────────────────────────────────────────────────────────┐
│                    DASH BI PLATFORM                      │
│          Ferramenta de BI completa integrada ao          │
│         Zenite CRM (estilo PowerBI/Looker Studio)        │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   FRONTEND            BACKEND             DATA LAYER
 (React/Tailwind)   (Supabase+Hono)      (Cube.dev)
```

---

## 📁 ESTRUTURA DE ARQUIVOS

```
dash/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Entry point
│   │   ├── routes.ts                        # ⭐ React Router config
│   │   └── components/
│   │       └── dash/                        # ⭐ Todos os componentes do Dash
│   │           ├── 🎯 CORE (Layout & Navigation)
│   │           │   ├── dash-layout.tsx      # Layout principal (Sidebar + Content)
│   │           │   ├── dash-sidebar.tsx     # Sidebar com navegação completa
│   │           │   └── dash-home.tsx        # Página inicial
│   │           │
│   │           ├── 📊 DASHBOARDS PRÉ-CONSTRUÍDOS
│   │           │   ├── dash-overview.tsx    # Visão Geral
│   │           │   ├── dash-vendas.tsx      # Dashboard de Vendas
│   │           │   ├── dash-pipeline.tsx    # Pipeline
│   │           │   ├── dash-atividades.tsx  # Atividades
│   │           │   ├── dash-performance.tsx # Performance
│   │           │   └── dash-conversao.tsx   # Conversão
│   │           │
│   │           ├── 🔨 BUILDERS (Criação de Dashboards)
│   │           │   ├── dash-builder.tsx            # Dashboard Builder (Grid)
│   │           │   └── dash-visual-builder.tsx     # ⭐ Visual Builder (Tableau-style)
│   │           │
│   │           ├── 📂 ESTÚDIO (Gestão de Dashboards Salvos)
│   │           │   ├── dash-dashboards-list.tsx    # ⭐ Lista de dashboards salvos
│   │           │   └── dash-relatorios-list.tsx    # ⭐ Lista de relatórios salvos
│   │           │
│   │           ├── 🔍 EXPLORADOR DE DADOS
│   │           │   ├── dash-tabelas.tsx     # Explorador de Tabelas
│   │           │   └── dash-objetos.tsx     # Explorador de Objetos
│   │           │
│   │           ├── 📄 RELATÓRIOS
│   │           │   └── dash-relatorios.tsx  # Biblioteca de Relatórios
│   │           │
│   │           ├── 🧩 COMPONENTES COMPARTILHADOS
│   │           │   ├── dash-chart-card.tsx           # Card de gráfico
│   │           │   ├── dash-kpi-card.tsx             # Card KPI
│   │           │   ├── dash-gauge.tsx                # Gauge chart
│   │           │   ├── dash-data-table.tsx           # Tabela de dados
│   │           │   ├── dash-analytics-item.tsx       # Item do Analytics Pane
│   │           │   └── dash-shelf-pill.tsx           # Pill para shelves
│   │           │
│   │           ├── 🧮 CALCULATED FIELDS & TABLE CALCULATIONS
│   │           │   ├── dash-calculated-field-editor.tsx  # Editor de fórmulas
│   │           │   └── dash-table-calculation-modal.tsx  # Table Calculations
│   │           │
│   │           ├── 🗓️ FILTROS DE DATA RELATIVA
│   │           │   ├── dash-relative-date-picker.tsx     # Picker com 35+ valores
│   │           │   └── dash-relative-date-utils.tsx      # Utilitários de data
│   │           │
│   │           ├── 🎨 SISTEMA DE DESIGN
│   │           │   └── dash-design-system.tsx        # Design System Zenite
│   │           │
│   │           ├── 🔄 DATA LAYER
│   │           │   ├── dash-data-provider.tsx        # ⭐ Provider de dados
│   │           │   └── dash-mock-data.ts             # Mock data (fallback)
│   │           │
│   │           └── 🛠️ UTILITÁRIOS
│   │               ├── dash-filter-context.tsx       # Context de filtros
│   │               ├── dash-drill-down.tsx           # Drill-down
│   │               └── dash-export-utils.tsx         # Exportar dados
│   │
│   ├── imports/                             # Assets do Figma
│   │   └── LeadBackground.tsx
│   │
│   └── styles/
│       ├── theme.css                        # Design System tokens
│       └── fonts.css                        # Fontes
│
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx                    # ⭐ Servidor Hono
│           └── kv_store.tsx                 # KV Store (protegido)
│
└── utils/
    └── supabase/
        └── info.tsx                         # Chaves Supabase
```

---

## 🗺️ MAPA DE ROTAS

### **Estrutura de URLs**

```
/ (DashLayout)                               # Layout principal
│
├── /                                        # Home
│
├── /dashboards                              # Dashboards Pré-construídos
│   ├── /overview                           # Visão Geral
│   ├── /vendas                             # Vendas
│   ├── /pipeline                           # Pipeline
│   ├── /atividades                         # Atividades
│   ├── /performance                        # Performance
│   ├── /conversao                          # Conversão
│   └── /builder                            # Dashboard Builder (Grid)
│
├── /explorador                              # Explorador de Dados
│   ├── /tabelas                            # Tabelas do CRM
│   └── /objetos                            # Objetos Customizados
│
├── /estudio                                 # ⭐ Estúdio de Dashboards
│   ├── /visual                             # Visual Builder (Tableau-style)
│   └── /dashboards                         # Gestão de Dashboards Salvos
│       ├── /recentes                       # Recentes
│       ├── /criados-por-mim                # Criados por Mim
│       ├── /privados                       # Privados
│       ├── /publicos                       # Públicos
│       └── /todos                          # Todos
│   └── /relatorios                         # ⭐ Gestão de Relatórios Salvos
│       ├── /recentes                       # Recentes
│       ├── /criados-por-mim                # Criados por Mim
│       ├── /privados                       # Privados
│       ├── /publicos                       # Públicos
│       └── /todos                          # Todos
│
├── /relatorios                              # Biblioteca de Relatórios
│
└── /design-system                           # Design System (dev)
```

---

## 🔗 NAVEGAÇÃO DO SIDEBAR

```
📊 SIDEBAR
│
├── 🏠 Início (/)
│
├── 📊 Dashboards
│   ├── Visão Geral (/dashboards/overview)
│   ├── Vendas (/dashboards/vendas)
│   ├── Pipeline (/dashboards/pipeline)
│   ├── Atividades (/dashboards/atividades)
│   ├── Performance (/dashboards/performance)
│   ├── Conversão (/dashboards/conversao)
│   └── 🔨 Builder (/dashboards/builder)
│
├── 🔍 Explorador de Dados
│   ├── Tabelas (/explorador/tabelas)
│   └── Objetos (/explorador/objetos)
│
├── 🎨 Estúdio                               # ⭐ COMPLETO!
│   ├── 📑 Relatórios                        # ⭐ IMPLEMENTADO!
│   │   ├── Recentes (/estudio/relatorios/recentes)
│   │   ├── Criados por mim (/estudio/relatorios/criados-por-mim)
│   │   ├── Privados (/estudio/relatorios/privados)
│   │   ├── Públicos (/estudio/relatorios/publicos)
│   │   └── Todos Relatórios (/estudio/relatorios/todos)
│   │
│   └── 📊 Dashboards                        # ⭐ IMPLEMENTADO!
│       ├── Recentes (/estudio/dashboards/recentes)
│       ├── Criados por mim (/estudio/dashboards/criados-por-mim)
│       ├── Privados (/estudio/dashboards/privados)
│       ├── Públicos (/estudio/dashboards/publicos)
│       └── Todos (/estudio/dashboards/todos)
│
└── 📄 Relatórios (/relatorios)
```

---

## 🎯 COMPONENTES PRINCIPAIS

### **1. DashLayout** (`dash-layout.tsx`)
- Layout principal com Sidebar + Content Area
- DashDataProvider wrapping (fornece dados para todos)
- Responsive design

### **2. DashVisualBuilder** (`dash-visual-builder.tsx`)
- **Visual Builder completo** estilo Tableau
- **3 colunas**:
  - Esquerda (240px): Data Pane + Analytics + Calculated Fields
  - Direita (220px): Marcações + Filtros
  - Centro: Canvas com Columns/Rows shelves
- **297 campos reais** de 9 tabelas CRM
- **17 funções de agregação**
- **Sistema de Calculated Fields** com editor de fórmulas
- **Table Calculations** (Tableau-style)
- **Drag & Drop** (Analytics Pane)
- **Filtros de data relativa** (35+ valores)
- **Modal de salvamento** (nome, descrição, privacidade)

### **3. DashDashboardsList** (`dash-dashboards-list.tsx`)
- Lista de dashboards salvos
- Grid responsivo (1/2/3 colunas)
- Filtros: recentes, meus, privados, públicos, todos
- Busca em tempo real
- Ações: abrir, excluir
- Animações Motion (stagger)

### **4. DashRelatoriosList** (`dash-relatorios-list.tsx`)
- Lista de relatórios salvos
- Idêntico ao DashboardsList (estrutura separada)
- Grid responsivo (1/2/3 colunas)
- Filtros: recentes, meus, privados, públicos, todos
- Busca em tempo real
- Ações: abrir, excluir
- Animações Motion (stagger)

### **5. DashDataProvider** (`dash-data-provider.tsx`)
- Provider que fornece dados do CRM via Supabase
- Context acessível por todos os componentes
- Cache de dados

---

## 🔄 FLUXO DE DADOS

```
┌─────────────────┐
│  SUPABASE CRM   │  9 Tabelas Reais
│   (Postgres)    │  • crm_leads
│                 │  • crm_opportunities
└────────┬────────┘  • crm_activities
         │           • crm_accounts
         │           • crm_contacts
         ▼           • crm_products
┌─────────────────┐  • crm_campaigns
│  HONO SERVER    │  • crm_users
│  (Edge Function)│  • crm_reports
│                 │
│  Endpoints:     │
│  • /dash/data   │ ← Dados agregados
│  • /dash/leads  │
│  • /dash/opps   │
│  • /visual-     │ ← ⭐ Dashboards salvos
│    builder/*    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ DashDataProvider│ ← Context Provider
└────────┬────────┘
         │
         ├─────────────┬─────────────┬─────────────┐
         ▼             ▼             ▼             ▼
    DashHome    DashVisualBuilder  Charts     Filters
```

---

## 🎨 DESIGN SYSTEM

### **Cores Principais**
```
Primary:    #0483AB (Azul Zenite)
Success:    #3CCEA7 (Verde)
Warning:    #917822 (Dourado)
Danger:     #F56233 (Vermelho)
Purple:     #6868B1

Neutros:
  #122232 (Texto primário)
  #4E6987 (Texto secundário)
  #98989d (Texto terciário)
  #EEF1F6 (Borders)
  #F6F7F9 (Background secundário)
```

### **Tipografia**
- **Font Family**: Suisse Intl (com fallbacks)
- **Font Features**: `'ss01', 'ss04', 'ss05', 'ss07'`
- **Letter Spacing**: -0.3 a -0.5px (tight tracking)

### **Border Radius**
- Cards: 12-20px
- Buttons: 8-12px (ou 100px para pills)
- Inputs: 8-12px

---

## 🚀 PRÓXIMAS IMPLEMENTAÇÕES

### **Prioridade Alta**
- [ ] Carregar dashboard salvo no Visual Builder (`?load=id`)
- [ ] Sistema de Relatórios salvos (similar aos Dashboards)
- [ ] Permissões por usuário (public/private real)

### **Prioridade Média**
- [ ] Duplicar dashboard
- [ ] Compartilhar link público
- [ ] Preview do dashboard nos cards
- [ ] Histórico de versões

### **Prioridade Baixa**
- [ ] Colaboração em tempo real
- [ ] Agendamento de relatórios
- [ ] Alertas baseados em métricas

---

## 📊 DADOS DO CRM (297 CAMPOS)

### **9 Tabelas Reais**

1. **crm_leads** (31 campos)
2. **crm_opportunities** (18 campos)
3. **crm_activities** (12 campos)
4. **crm_accounts** (15 campos)
5. **crm_contacts** (10 campos)
6. **crm_products** (8 campos)
7. **crm_campaigns** (5 campos)
8. **crm_users** (2 campos)
9. **crm_reports** (mock)

### **17 Funções de Agregação**
- SUM, AVG, MIN, MAX, COUNT
- COUNT DISTINCT, MEDIAN
- PERCENTILE 25/50/75/90/95/99
- STDEV, VARIANCE

---

## 🔐 BACKEND ENDPOINTS

```
GET  /make-server-d2ca3281/health
GET  /make-server-d2ca3281/dash/data
GET  /make-server-d2ca3281/dash/leads
GET  /make-server-d2ca3281/dash/opportunities
GET  /make-server-d2ca3281/dash/activities
GET  /make-server-d2ca3281/dash/accounts
GET  /make-server-d2ca3281/dash/contacts

# Builder Layout
GET  /make-server-d2ca3281/dash/builder/layout
POST /make-server-d2ca3281/dash/builder/layout
DEL  /make-server-d2ca3281/dash/builder/layout

# Visual Builder Dashboards ⭐
POST /make-server-d2ca3281/dash/visual-builder/save
GET  /make-server-d2ca3281/dash/visual-builder/list
GET  /make-server-d2ca3281/dash/visual-builder/get/:id
DEL  /make-server-d2ca3281/dash/visual-builder/delete/:id

# Visual Builder Relatórios ⭐ NOVO!
POST /make-server-d2ca3281/dash/visual-builder/save-report
GET  /make-server-d2ca3281/dash/visual-builder/list-reports
GET  /make-server-d2ca3281/dash/visual-builder/get-report/:id
DEL  /make-server-d2ca3281/dash/visual-builder/delete-report/:id
```

---

## 📝 CONVENÇÕES DE CÓDIGO

### **Nomenclatura de Arquivos**
- Componentes: `dash-[nome].tsx` (kebab-case)
- Utilitários: `dash-[nome]-utils.tsx`
- Contextos: `dash-[nome]-context.tsx`
- Dados: `dash-[nome]-data.ts`

### **Estrutura de Componentes**
```tsx
// 1. Imports
import { useState } from "react";
import { Icon } from "@phosphor-icons/react";

// 2. Types
interface Props { ... }

// 3. Constants
const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

// 4. Component
export function DashComponentName() {
  // States
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => { ... }, []);
  
  // Handlers
  const handleClick = () => { ... };
  
  // Render
  return ( ... );
}
```

### **Estilo**
- **Tailwind CSS v4**
- Inline styles APENAS para font features e letterSpacing
- Classes utilitárias SEMPRE que possível
- Motion para animações

---

## ✅ STATUS ATUAL

### **✅ Implementado**
- ✅ Layout principal com Sidebar
- ✅ 6 Dashboards pré-construídos
- ✅ Visual Builder completo (Tableau-style)
- ✅ Sistema de Calculated Fields
- ✅ Table Calculations
- ✅ Filtros de data relativa (35+ valores)
- ✅ Analytics Pane com drag & drop
- ✅ 297 campos reais de 9 tabelas
- ✅ 17 funções de agregação
- ✅ Backend Supabase + Hono
- ✅ KV Store para persistência
- ✅ **Sistema de salvamento de dashboards** ⭐
- ✅ **Sistema de salvamento de relatórios** ⭐
- ✅ **Listagem de dashboards com filtros** ⭐
- ✅ **Listagem de relatórios com filtros** ⭐
- ✅ **Rotas de gestão (/estudio/dashboards/* e /relatorios/*)** ⭐
- ✅ **Modal com opção: Dashboard ou Relatório** ⭐

### **🔄 Em Progresso**
- 🔄 Carregar dashboard/relatório salvo no Visual Builder

### **📋 Backlog**
- Dashboard Builder (Grid) melhorias
- Sistema de permissões
- Compartilhamento público
- Preview cards

---

**Última atualização**: 03/03/2026 ✨