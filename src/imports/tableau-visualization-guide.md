# Guia de Visualização: Arrastar Campos para Construir Gráficos

## Estrutura Básica do Canvas

Cada visualização no Dash é construída arrastando campos do **Data Pane** para diferentes áreas do canvas. Cada área afeta uma parte específica do gráfico:

### 🎯 Áreas Principais (Shelves)

#### **Columns (Colunas)** 
- 📊 Cria eixos **horizontais** ou colunas na visualização
- 💚 Medidas (verdes) → criam eixos numéricos
- 💙 Dimensões (azuis) → criam cabeçalhos/categorias
- **Exemplo**: Arrastar "Data" cria uma linha do tempo horizontal

#### **Rows (Linhas)**
- 📊 Cria eixos **verticais** ou linhas na visualização  
- 💚 Medidas → valores no eixo Y
- 💙 Dimensões → categorias verticais
- **Exemplo**: Arrastar "Vendas" cria um eixo de valores

#### **Filters (Filtros)**
- 🔍 Filtra os dados mostrados na visualização
- Aplica condições e restrições aos dados
- **Exemplo**: Arrastar "Região" permite filtrar por regiões específicas

#### **Pages**
- 📄 Cria animações frame-by-frame
- Útil para mostrar mudanças ao longo do tempo
- **Exemplo**: Arrastar "Ano" cria uma animação por ano

---

## 🎨 Marks Card: Propriedades Visuais

O **Marks Card** controla a aparência visual dos dados no gráfico:

### **Color (Cor)**
- 🎨 Codifica dados por cores
- Dimensões → paleta de cores categóricas
- Medidas → gradiente contínuo
- **Exemplo**: "Categoria" colore barras por cor diferente

### **Size (Tamanho)**
- 📏 Controla o tamanho das marcas (bolhas, barras, linhas)
- **Exemplo**: "Lucro" aumenta/diminui tamanho das bolhas

### **Label (Rótulo)**
- 🏷️ Adiciona texto sobre as marcas
- Mostra valores ou nomes diretamente no gráfico
- **Exemplo**: Exibir valores de vendas nas barras

### **Detail (Detalhe)**
- 🔬 Adiciona granularidade sem criar eixos
- Separa marcas sem afetar estrutura
- **Exemplo**: "Cliente" separa linhas individuais

### **Tooltip (Dica)**
- 💬 Informação que aparece ao passar o mouse
- Não afeta visualização, apenas interação
- **Exemplo**: Mostrar detalhes adicionais on-hover

### **Path (Caminho)**
- 🛤️ Define ordem de conexão de pontos (gráficos de linha)
- **Exemplo**: Ordenar cronologicamente pontos de uma trajetória

---

## 📐 Como Funciona: Drop Zones

### Zonas Azuis (Blue Drop Zones)
- **Dimensões discretas** criam cabeçalhos e categorias
- Dividem a visualização em grupos

### Zonas Verdes (Green Drop Zones)  
- **Medidas contínuas** criam eixos numéricos
- Representam valores quantitativos

### Show Me
- 🎯 Área especial que escolhe automaticamente o melhor tipo de gráfico
- Analisa campos selecionados e sugere visualização ideal

---

## 🚀 Exemplos Práticos

### 1️⃣ Gráfico de Barras Simples
```
Rows: Segment (dimensão)
Columns: SUM(Profit) (medida)
Resultado: Barras horizontais mostrando lucro por segmento
```

### 2️⃣ Linha do Tempo
```
Columns: MONTH(Order Date) (data)
Rows: SUM(Sales) (medida)
Resultado: Linha mostrando vendas ao longo dos meses
```

### 3️⃣ Dual Axis (Dois Eixos)
```
Rows: SUM(Sales) + SUM(Profit)
Columns: MONTH(Order Date)
Resultado: Duas linhas com escalas independentes
```

### 4️⃣ Scatter Plot com Cores
```
Columns: SUM(Sales)
Rows: SUM(Profit)
Color: Category
Size: Quantity
Resultado: Bolhas coloridas por categoria, tamanho por quantidade
```

---

## ⚡ Dicas Rápidas

### **Duplo Clique**
- Clicar duas vezes em um campo adiciona automaticamente ao melhor local
- Tableau decide inteligentemente onde colocar

### **Arrastar entre Shelves**
- Você pode mover campos entre Rows ↔ Columns
- Troca orientação do gráfico (horizontal ↔ vertical)

### **Remover Campos**
- Arrastar para fora do canvas
- Ou clicar com botão direito → "Remove"

### **Substituir vs. Adicionar**
- **Arrastar para borda** → Adiciona novo eixo/dimensão
- **Arrastar para centro** → Substitui existente
- **Arrastar para cima do eixo** → Mescla medidas (single axis blend)
- **Arrastar para lado direito** → Cria dual axis

---

## 📊 Tipos de Visualização por Campos

| Primeiro Campo | Segundo Campo | Resultado |
|----------------|---------------|-----------|
| Dimensão | - | Tabela texto |
| Medida | Dimensão | Gráfico de barras |
| Medida | Data | Gráfico de linha |
| Campo geográfico | - | Mapa |
| Medida | Medida | Scatter plot |
| Dimensão contínua | Medida | Linha contínua |

---

## 🎯 Regras de Ouro

1. **Columns** = Eixo Horizontal / Colunas
2. **Rows** = Eixo Vertical / Linhas  
3. **Filters** = Reduz dados mostrados
4. **Marks** = Aparência visual (cor, tamanho, label)
5. **Verde** = Contínuo (números, eixos)
6. **Azul** = Discreto (categorias, cabeçalhos)

---

## 🔄 Desfazer/Refazer

- **Ctrl+Z** (Cmd+Z no Mac) → Desfazer
- **Ctrl+Y** (Cmd+Shift+Z no Mac) → Refazer  
- Desfaz até o último momento que o workbook foi aberto
- Ilimitado - experimente sem medo!
