# Drop Zones — Resumo Técnico

## 🏗️ Arquitetura de Componentes

### 1. **CanvasDropZones** (Canvas Vazio)
**Arquivo**: `/src/app/components/dash/dash-visual-builder.tsx` (linhas 1470-1667)

**Responsabilidade**: 
- Exibir 3 zonas grandes quando `vizData.length === 0`
- Grid layout: `grid-cols-3` com `gap-6` e `padding: 12`

**Drop Zones**:
- **Azul** (Dimensões): `dropDimension` → `onDropDimension()`
- **Verde** (Medidas): `dropMeasure` → `onDropMeasure()`
- **Roxa** (Auto): `dropAuto` → Auto-detecta tipo e roteia

**Estados**:
- `isOverDimension`, `isOverMeasure`, `isOverAuto`
- `isDragging` (agregado dos 3)
- Motion animations: `scale`, `opacity`

**Comportamento**:
```tsx
onDropDimension={(field) => {
  setRowShelf(prev => [...prev, { field, dateLevel: "year" }]);
  toast.success(`${field.label} adicionado às Linhas`);
}}

onDropMeasure={(field) => {
  setColShelf(prev => [...prev, { field }]);
  toast.success(`${field.label} adicionado às Colunas`);
}}
```

---

### 2. **CanvasDropOverlay** (Canvas com Dados)
**Arquivo**: `/src/app/components/dash/dash-visual-builder.tsx` (linhas 1669-1806)

**Responsabilidade**:
- Overlay sobre gráfico existente quando `vizData.length > 0`
- Aparece APENAS quando `isDragging === true`

**Drop Zones**:
- **Top** (Columns): Faixa horizontal 80px altura
- **Left** (Rows): Faixa vertical 80px largura
- **Center/Right** (Show Me): Box flutuante 140x100px

**Posicionamento**:
```css
/* Top */
absolute top-0 left-0 right-0 h-[80px]

/* Left */
absolute top-[80px] bottom-0 left-0 w-[80px]

/* Show Me */
absolute top-[50%] right-[20px] -translate-y-1/2 w-[140px] h-[100px]
```

**Estados**:
- `isOverTop`, `isOverLeft`, `isOverCenter`
- `isDragging` (detecta se há item sendo arrastado)
- `if (!isDragging) return null;` → Otimização

**Comportamento**:
```tsx
onDropColumns={(field) => {
  setColShelf(prev => [...prev, { field }]);
}}

onDropRows={(field) => {
  setRowShelf(prev => [...prev, { field, dateLevel: "year" }]);
}}

onDropShowMe={(field) => {
  // Auto-detect routing
  if (field.type === "measure") {
    setColShelf(prev => [...prev, { field }]);
  } else {
    setRowShelf(prev => [...prev, { field, dateLevel: "year" }]);
  }
}}
```

---

## 🎨 Estilos e Cores

### Canvas Vazio (CanvasDropZones)

#### Dimensões (Azul)
```css
/* Normal */
border: 2px dashed #C8CFDB
background: #F6F7F9 50%
opacity: 70%

/* Dragging */
border: 2px dashed #0483AB
background: #DCF0FF 20%
opacity: 100%

/* Hover */
border: 2px dashed #0483AB
background: #DCF0FF 40%
scale: 102%
shadow: lg
```

#### Medidas (Verde)
```css
/* Normal */
border: 2px dashed #C8CFDB
background: #F6F7F9 50%

/* Hover */
border: 2px dashed #3CCEA7
background: #D4F8EE 40%
```

#### Auto-detect (Roxo)
```css
/* Normal */
border: 2px dashed #C8CFDB
background: #F6F7F9 50%

/* Hover */
border: 2px dashed #6868B1
background: #EEEEFD 40%
```

---

### Canvas com Dados (CanvasDropOverlay)

#### Top Zone (Columns - Verde)
```css
/* Normal */
border: 2px dashed #DDE3EC
background: white 40%

/* Hover */
border: 2px dashed #3CCEA7
background: #D4F8EE 60%
```

#### Left Zone (Rows - Azul)
```css
/* Normal */
border: 2px dashed #DDE3EC
background: white 40%

/* Hover */
border: 2px dashed #0483AB
background: #DCF0FF 60%
```

#### Show Me Zone (Roxo)
```css
/* Normal */
border: 2px dashed #DDE3EC
background: white 60%
border-radius: 12px

/* Hover */
border: 2px dashed #6868B1
background: #EEEEFD 80%
```

---

## 🔧 Integração com React DnD

### useDrop Hook Pattern

```tsx
const [{ isOver }, drop] = useDrop({
  accept: ITEM_TYPE, // "FIELD"
  drop: (item: { field: CrmField }) => {
    // Handler lógico
  },
  collect: (monitor) => ({
    isOver: monitor.isOver() && monitor.canDrop(),
  }),
});
```

### Drag Item Type

```tsx
interface DragItem {
  field: CrmField;
}

interface CrmField {
  id: string;
  name: string;
  label: string;
  table: string;
  type: "dimension" | "measure" | "date";
  dataType: "string" | "number" | "date" | "boolean";
  aggregation?: "SUM" | "AVG" | "COUNT" | "MIN" | "MAX" | "COUNTD";
}
```

---

## 🚀 Performance e Otimizações

### 1. Conditional Rendering
```tsx
// CanvasDropOverlay só renderiza se está arrastando
if (!isDragging) return null;
```

### 2. Pointer Events
```tsx
// Overlay não interfere com interação do gráfico
className="absolute inset-0 pointer-events-none"
// Mas zonas são clicáveis
className="pointer-events-auto"
```

### 3. AnimatePresence
```tsx
// Apenas no canvas principal, não nos overlays
<AnimatePresence mode="wait">
  <motion.div key={vizData.length}>
    {renderViz()}
  </motion.div>
</AnimatePresence>
```

### 4. Memoization Opportunities
```tsx
// Considerar useMemo para callbacks pesados
const handleDropColumns = useCallback((field) => {
  setColShelf(prev => [...prev, { field }]);
}, []);
```

---

## 🧪 Casos de Teste

### Cenário 1: Canvas Vazio
1. ✅ Arrastar dimensão → Zona azul destaca
2. ✅ Soltar dimensão → Adiciona a Rows
3. ✅ Arrastar medida → Zona verde destaca
4. ✅ Soltar medida → Adiciona a Columns
5. ✅ Arrastar qualquer → Zona roxa sempre aceita

### Cenário 2: Canvas com Dados
1. ✅ Não arrastar → Overlay invisível
2. ✅ Começar arrastar → Overlay fade in
3. ✅ Hover zona top → Verde forte + label
4. ✅ Hover zona left → Azul forte + label
5. ✅ Hover zona show me → Roxo forte + label
6. ✅ Soltar fora → Nada acontece
7. ✅ Soltar em zona → Campo adicionado + toast

### Cenário 3: Transição Vazio → Com Dados
1. ✅ Canvas vazio → 3 zonas grandes
2. ✅ Soltar primeiro campo → Gráfico aparece
3. ✅ Arrastar segundo campo → Overlay aparece
4. ✅ Soltar segundo → Breakdown criado

---

## 🐛 Debugging

### Console Logs Úteis
```tsx
// Em CanvasDropOverlay
console.log('isDragging:', isDragging);
console.log('isOverTop:', isOverTop);
console.log('vizData.length:', vizData.length);
```

### Inspecionar Estado DnD
```tsx
const [{ isDragging, item }, drop] = useDrop({
  accept: ITEM_TYPE,
  collect: (monitor) => ({
    isDragging: monitor.getItem() !== null,
    item: monitor.getItem(),
  }),
});

console.log('Current drag item:', item);
```

---

## 📚 Referências

- **Tableau Docs**: [Start Building a Visualization by Dragging Fields](https://help.tableau.com/current/pro/desktop/en-us/buildmanual_dragging.htm)
- **React DnD**: [useDrop Hook](https://react-dnd.github.io/react-dnd/docs/api/use-drop)
- **Framer Motion**: [Animation Controls](https://www.framer.com/motion/animation/)

---

**💡 Nota**: Este sistema replica o comportamento do Tableau onde você pode arrastar campos diretamente para o canvas em qualquer momento, seja para começar uma visualização do zero ou para adicionar breakdown a uma existente.
