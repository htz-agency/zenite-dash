# Canvas Drop Zones — Guia de Uso

## 📍 O que são Drop Zones?

Drop Zones são **áreas interativas no canvas** onde você pode arrastar campos do Data Pane para criar visualizações rapidamente, sem precisar usar os shelves (Columns/Rows). Este é um recurso inspirado no Tableau que facilita a construção de gráficos.

**✨ Funcionam em dois modos:**
1. **Canvas Vazio**: 3 zonas grandes para começar do zero
2. **Canvas com Dados**: Overlay inteligente sobre o gráfico existente

---

## 🎯 Modo 1: Canvas Vazio (Começar do Zero)

Quando o canvas está vazio (sem dados), você verá **3 drop zones** diferentes:

### 1️⃣ **Zona Azul** (Esquerda) — Dimensões e Datas
- 🔵 **Cor**: Azul (#0483AB)
- 📊 **Ícone**: Linhas (Rows)
- **Aceita**: Dimensões e campos de data
- **Ação**: Adiciona o campo ao **Rows shelf**
- **Exemplos**: Estágio, Região, Nome, Data de Criação

### 2️⃣ **Zona Verde** (Centro) — Medidas e Métricas
- 🟢 **Cor**: Verde (#3CCEA7)
- 📏 **Ícone**: Colunas (Columns)
- **Aceita**: Medidas numéricas
- **Ação**: Adiciona o campo ao **Columns shelf**
- **Exemplos**: Vendas, Lucro, Quantidade, Score

### 3️⃣ **Zona Roxa** (Direita) — Show Me (Auto-detect)
- 🟣 **Cor**: Roxa (#6868B1)
- ✨ **Ícone**: Sparkle (estrela)
- **Aceita**: Qualquer tipo de campo
- **Ação**: Detecta automaticamente e adiciona ao shelf ideal
  - Medidas → Columns
  - Dimensões/Datas → Rows

---

## 🖱️ Como Usar

### Passo 1: Identifique o tipo do campo
- Olhe a **cor do ícone** no Data Pane:
  - 💙 **Azul** = Dimensão ou Data
  - 💚 **Verde** = Medida

### Passo 2: Arraste para a zona correspondente
1. Clique e segure o campo no Data Pane
2. Arraste até o canvas vazio
3. Passe o mouse sobre uma das 3 zonas
4. Solte quando a zona destacar (borda colorida + shadow)

### Passo 3: Visualização automática
- O campo será adicionado ao shelf apropriado
- O gráfico será gerado automaticamente
- Você verá uma notificação de sucesso

---

## ✨ Feedback Visual

### Estados das Drop Zones

#### **Estado Inativo** (nenhum campo sendo arrastado)
- Opacidade: 70%
- Borda: Cinza pontilhada (#C8CFDB)
- Fundo: Cinza claro (#F6F7F9)

#### **Estado Ativo** (campo sendo arrastado)
- Opacidade: 100%
- Borda: Colorida conforme tipo (azul/verde/roxa)
- Fundo: Colorido translúcido

#### **Estado Hover** (mouse sobre a zona)
- Escala: 102% (zoom leve)
- Shadow: Elevação visual
- Ícone: Aumenta 110% + animação

---

## 🎨 Cores e Convenções

| Zona | Cor Principal | Cor Fundo Hover | Tipo de Campo |
|------|---------------|-----------------|---------------|
| Dimensões | #0483AB (Azul) | #DCF0FF | dimension, date |
| Medidas | #3CCEA7 (Verde) | #D4F8EE | measure |
| Auto-detect | #6868B1 (Roxo) | #EEEEFD | Qualquer |

---

## 🔄 Fluxo de Trabalho

```
📂 Data Pane
    ⬇️ Arrastar campo
🎯 Canvas Drop Zone
    ⬇️ Soltar na zona
📊 Shelf (Columns ou Rows)
    ⬇️ Processamento
📈 Visualização gerada
```

---

## 🎯 Modo 2: Canvas com Dados (Adicionar a Viz Existente)

Quando o canvas **JÁ TEM dados** e você arrasta um campo, aparecem **drop zones overlay** sobre o gráfico:

### 🔝 **Zona Superior** (Top) — Adicionar às Colunas
- 🟢 **Cor**: Verde translúcido (#D4F8EE)
- 📊 **Posição**: Faixa horizontal no topo (80px de altura)
- **Ação**: Adiciona campo ao final do **Columns shelf**
- **Efeito**: Cria breakdown adicional no eixo horizontal

### ◀️ **Zona Esquerda** (Left) — Adicionar às Linhas
- 🔵 **Cor**: Azul translúcido (#DCF0FF)
- 📏 **Posição**: Faixa vertical à esquerda (80px de largura)
- **Ação**: Adiciona campo ao final do **Rows shelf**
- **Efeito**: Cria breakdown adicional no eixo vertical

### ✨ **Zona Show Me** (Right) — Auto-detect
- 🟣 **Cor**: Roxo translúcido (#EEEEFD)
- 🎯 **Posição**: Caixa flutuante no lado direito (140x100px)
- **Ação**: Detecta automaticamente e adiciona ao shelf ideal
- **Efeito**: Sistema decide onde o campo vai melhor

### 💡 Como Funciona o Overlay

**Estado Invisível**:
- Quando **não está** arrastando → Overlay não aparece
- Gráfico fica 100% visível e interativo

**Estado Ativo** (arrastando campo):
- Overlay aparece com animação suave (fade in)
- 3 zonas ficam visíveis com bordas pontilhadas
- Fundo translúcido permite ver o gráfico por baixo

**Estado Hover** (mouse sobre zona):
- Zona destaca com cor forte e sombra
- Label "Drop field here" aparece
- Visual feedback claro de onde o campo vai cair

### 🎨 Comparação: Vazio vs. Com Dados

| Aspecto | Canvas Vazio | Canvas com Dados |
|---------|--------------|------------------|
| **Layout** | Grid 3 colunas | Overlay posicionado |
| **Tamanho** | Zonas grandes (1/3) | Zonas nas bordas |
| **Visibilidade** | Sempre visível | Só ao arrastar |
| **Objetivo** | Começar do zero | Adicionar breakdown |
| **Ação** | Cria shelf inicial | Adiciona ao shelf |

---

## 💡 Dicas e Truques

### ✅ Quando usar cada zona?

**Zona Azul (Dimensões)**:
- Criar categorias no eixo vertical
- Agrupar dados por segmento
- Adicionar dimensão temporal

**Zona Verde (Medidas)**:
- Criar eixos numéricos
- Plotar valores quantitativos
- Comparar métricas

**Zona Roxa (Auto-detect)**:
- Quando estiver em dúvida
- Para experimentar rapidamente
- Deixar o sistema decidir o melhor local

### ⚡ Atalhos

- **Duplo clique** em um campo → Auto-adiciona ao shelf ideal
- **Arrastar para shelf** → Controle total da posição
- **Arrastar para canvas** → Rápido e visual

### 🎯 Boas Práticas

1. **Comece simples**: 1 dimensão + 1 medida
2. **Experimente**: Use a zona Auto-detect para explorar
3. **Refine**: Depois ajuste nos shelves se necessário
4. **Combine**: Arraste múltiplos campos sequencialmente

---

## 🚨 Troubleshooting

### ❌ A zona não está destacando?
- Verifique se você está arrastando o campo correto
- Dimensões não podem ir na zona verde (medidas)
- Medidas não podem ir na zona azul (dimensões)

### ❌ Nada acontece ao soltar?
- Certifique-se de soltar **dentro** da zona
- Aguarde a borda colorida aparecer antes de soltar

### ❌ Drop zones não aparecem?
- As zonas só aparecem quando o canvas está **vazio**
- Se já houver dados, arraste para os shelves no topo

---

## 📚 Recursos Relacionados

- [Guia de Visualização — Arrastar Campos](./tableau-visualization-guide.md)
- [Shelves: Columns & Rows](./tableau-visualization-basics.md)
- [Show Me: Auto-detect Charts](./tableau-visualization-basics.md)

---

## 🎓 Conceitos Avançados

### Múltiplos Campos

Você pode arrastar múltiplos campos sequencialmente:

1. **Primeiro campo** → Define estrutura básica
2. **Segundo campo** → Adiciona granularidade
3. **Terceiro campo** → Cria facets/breakdown

### Ordem Importa

A ordem que você arrasta os campos afeta a visualização:

- **Dimensão → Medida** = Gráfico de barras
- **Medida → Dimensão** = Também barras, mas orientação diferente
- **Data → Medida** = Linha do tempo
- **Medida → Medida** = Scatter plot

### Tipos de Gráfico Auto-detectados

| Combinação | Gráfico Gerado |
|------------|----------------|
| 1 Dimensão + 1 Medida | Barra |
| 1 Data + 1 Medida | Linha |
| 2 Medidas | Scatter |
| 1 Campo geográfico | Mapa |
| 1 Dimensão sem medida | Tabela |

---

**💡 Lembre-se**: Drop zones são apenas um **atalho visual**. Você sempre pode usar os shelves diretamente para controle total!
