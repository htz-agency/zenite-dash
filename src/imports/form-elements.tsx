<Card>
          <SectionTitle>Inputs & Forms</SectionTitle>
          <SectionSubtitle>Campos de formulário padrão — modais e painéis de edição.</SectionSubtitle>

          <Label>Input Padrão (Modal)</Label>
          <div className="flex flex-col gap-[6px] max-w-[320px] mb-[16px]">
            <label className="text-[#4E6987] uppercase" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3, ...fontFeature }}>
              Assunto
            </label>
            <input
              type="text"
              placeholder="Ex: Reunião com cliente Alpha"
              defaultValue="Reunião de alinhamento"
              className="w-full h-[38px] px-[12px] rounded-[10px] border border-[#DDE3EC] bg-white text-[#28415c] outline-none focus:border-[#07ABDE] transition-colors"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}
            />
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            h-[38px] rounded-[10px] border-[#DDE3EC] focus:border-[#07ABDE] · Label: 11px/700 uppercase
          </span>

          <Label>Input Inline (Painel lateral — edição)</Label>
          <div className="max-w-[280px] mb-[16px]">
            <input
              type="text"
              defaultValue="Reunião semanal"
              className="w-full bg-transparent border-b border-[#07ABDE] outline-none text-[#28415c]"
              style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
            />
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            bg-transparent border-b border-[#07ABDE] — para edição inline de títulos
          </span>

          <Label>Textarea</Label>
          <div className="max-w-[320px] mb-[16px]">
            <textarea
              rows={2}
              defaultValue="Descrição do compromisso"
              className="w-full text-[#4E6987] bg-[#F6F7F9] rounded-[8px] px-[10px] py-[6px] outline-none border border-transparent focus:border-[#07ABDE] resize-none"
              style={{ fontSize: 12, fontWeight: 400, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}
            />
          </div>

          <Label>Select / Dropdown (inline pill)</Label>
          <div className="flex flex-col gap-[8px] mb-[8px]">
            <select
              defaultValue="agendado"
              className="h-[28px] px-[10px] pr-[24px] rounded-[500px] border-none outline-none cursor-pointer uppercase bg-[#DCF0FF] w-fit appearance-none"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: "#07ABDE", ...fontFeature, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 256 256'%3E%3Cpath d='M128,188a12,12,0,0,1-8.49-3.51l-80-80a12,12,0,0,1,17-17L128,159,199.51,87.51a12,12,0,0,1,17,17l-80,80A12,12,0,0,1,128,188Z' fill='%2307ABDE'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
            >
              <option value="agendado">Agendado</option>
              <option value="confirmado">Confirmado</option>
              <option value="concluido">Concluído</option>
            </select>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              h-[24px] rounded-[500px] — herda bg/color do status config
            </span>
          </div>

          <Divider />

          <Label>Search Input (com ícone)</Label>
          <div className="max-w-[320px] mb-[16px]">
            <div
              className="relative flex items-center gap-[10px] h-[40px] px-[14px] rounded-full bg-[#DDE3EC] flex-1 min-w-[140px] max-w-[280px]"
              style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}
            >
              <MagnifyingGlass size={16} weight="bold" className="text-[#98989d] shrink-0" />
              <input
                type="text"
                placeholder="Buscar..."
                className="flex-1 bg-transparent outline-none text-[#28415c] placeholder:text-[#c8cfdb]"
                style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}
              />
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            rounded-full bg-[#DDE3EC] h-[40px] · inner shadow inset · ícone weight=&quot;bold&quot;
          </span>

          <Divider />

          {/* ── EditableField — Campos de Detalhe de Registro ── */}
          <Label>Campos de Detalhe de Registro (EditableField)</Label>
          <p className="text-[#4E6987] mb-[16px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Componente <code className="bg-[#f6f7f9] px-[4px] rounded-[4px] text-[#0483AB]">EditableField</code> — usado em todas as telas de detalhe (Lead, Conta, Contato, Oportunidade). Possui 5 estados visuais distintos com paleta de cores por estado.
          </p>

          {/* ── Estado: Inativo (Idle) ── */}
          <Label>Estado: Inativo (idle)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            {/* Text field */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Nome do Lead
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Alpha Tecnologia
                </span>
              </div>
              {/* Pencil button appears on hover */}
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* User field */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[160px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Proprietário
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="size-[16px] rounded-full bg-[#dde3ec] flex items-center justify-center shrink-0 text-[#4e6987]" style={{ fontSize: 8, fontWeight: 700 }}>
                  M
                </span>
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Marcelo Silva
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Link field */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[160px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Website
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  alpha.com.br
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            label: text-[#98989d] 10px/700 uppercase · value: text-[#4e6987] 15px/500 · link types: text-[#0483AB] · border-transparent · hover:bg-[#f6f7f9] · pencil: size-[16px] bg-[#dde3ec] text-[#4e6987]
          </span>

          {/* ── Estado: Hover ── */}
          <Label>Estado: Hover</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Nome do Lead
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Alpha Tecnologia
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Empty field */}
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent bg-[#f6f7f9] cursor-pointer transition-all min-w-[160px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Telefone
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#c8cfdb]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  —
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            bg-[#f6f7f9] · pencil aparece · valor vazio: text-[#c8cfdb] &quot;—&quot;
          </span>

          {/* ── Estado: Editando ── */}
          <Label>Estado: Editando (editing)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            {/* Text editing */}
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#07abde] cursor-text transition-all min-w-[180px]">
              <div className="flex items-center">
                <span className="text-[#07abde] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Nome do Lead
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <input
                  type="text"
                  defaultValue="Alpha Tecnologia"
                  className="flex-1 bg-transparent outline-none text-[#4e6987] min-w-0"
                  style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
                />
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#dcf0ff] text-[#07abde] cursor-pointer">
                  <X size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Type/picklist editing — dropdown indicator */}
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#07abde] cursor-pointer transition-all min-w-[160px]">
              <div className="flex items-center">
                <span className="text-[#07abde] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Setor
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="size-[8px] rounded-full shrink-0" style={{ backgroundColor: "#07ABDE" }} />
                <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Tecnologia
                </span>
                <CaretDown size={12} weight="bold" className="text-[#07abde] ml-auto" />
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#dcf0ff] text-[#07abde] cursor-pointer">
                  <X size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            label: text-[#07abde] · border-[#07abde] · p-[5px] (compensa borda) · botão único: bg-[#dcf0ff] text-[#07abde] · Editing → X (cancelar)
          </span>

          {/* ── Estado: Não salvo (unsaved) ── */}
          <Label>Estado: Não salvo (unsaved)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#C4990D] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center">
                <span className="text-[#C4990D] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Nome do Lead
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#C4990D]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Alpha Tech LTDA
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#feedca] text-[#C4990D] cursor-pointer" title="Salvar">
                  <Check size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* User field unsaved */}
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#C4990D] cursor-pointer transition-all min-w-[160px]">
              <div className="flex items-center">
                <span className="text-[#C4990D] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Proprietário
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="size-[16px] rounded-full bg-[#dde3ec] flex items-center justify-center shrink-0 text-[#4e6987]" style={{ fontSize: 8, fontWeight: 700 }}>
                  A
                </span>
                <span className="text-[#C4990D]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Ana Costa
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#feedca] text-[#C4990D] cursor-pointer">
                  <Check size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            label + value: text-[#C4990D] · border-[#C4990D] · botão único: bg-[#feedca] text-[#C4990D] · Unsaved → Check (salvar)
          </span>

          {/* ── Estado: Erro ── */}
          <Label>Estado: Erro (error)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#f56233] transition-all min-w-[180px]">
              <div className="flex items-center gap-[2px]">
                <span className="text-[#f56233] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Email<span className="text-[#f56233] ml-[2px]">*</span>
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#f56233]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  email-invalido
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#ffedeb] text-[#ff8c76] cursor-pointer">
                  <X size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Required empty error */}
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#f56233] transition-all min-w-[160px]">
              <div className="flex items-center">
                <span className="text-[#f56233] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Telefone<span className="text-[#f56233] ml-[2px]">*</span>
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#f56233]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Campo obrigatório
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#ffedeb] text-[#ff8c76] cursor-pointer">
                  <X size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            label + value: text-[#f56233] · border-[#f56233] · botões: bg-[#ffedeb] text-[#ff8c76] · required: asterisco vermelho
          </span>

          <Divider />

          {/* ── Variações especiais ── */}
          <Label>Variações especiais</Label>
          <div className="flex items-start gap-[16px] flex-wrap mb-[6px]">
            {/* AI field */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[150px]">
              <div className="flex items-center gap-[2px]">
                <Sparkle size={10} weight="duotone" className="text-[#98989d]" />
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Score IA
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  87
                </span>
              </div>
            </div>

            {/* Highlighted field */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent bg-[#f6f7f9] cursor-pointer transition-all min-w-[150px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Receita Anual
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  R$ 1.500.000,00
                </span>
              </div>
            </div>

            {/* Boolean field */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[120px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Opt-in Email
                </span>
              </div>
              <div className="flex items-center gap-[8px] min-h-[22px]">
                <span className="relative w-[36px] h-[20px] rounded-full" style={{ backgroundColor: "#07ABDE" }}>
                  <span className="absolute top-[2px] left-[18px] w-[16px] h-[16px] rounded-full bg-white" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
                </span>
                <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Sim
                </span>
              </div>
            </div>

            {/* Type field with color dot */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[140px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Setor
                </span>
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="size-[8px] rounded-full shrink-0" style={{ backgroundColor: "#07ABDE" }} />
                <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Tecnologia
                </span>
              </div>
            </div>

            {/* Multipicklist */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-[4px] min-h-[22px] items-center">
                {[{ l: "VIP", c: "#3CCEA7" }, { l: "Enterprise", c: "#07ABDE" }, { l: "Prioridade", c: "#EAC23D" }].map((t) => (
                  <span key={t.l} className="inline-flex items-center h-[22px] px-[8px] rounded-[6px]" style={{ backgroundColor: `${t.c}20`, color: t.c, fontSize: 12, fontWeight: 600, letterSpacing: 0.2, ...fontFeature }}>
                    {t.l}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[4px]" style={{ fontSize: 10 }}>
            ai: Sparkle icon · highlighted: bg-[#f6f7f9] permanente · boolean: ZeniteToggle · type: color dot 8px · multipicklist: pills com cor 20% opacity
          </span>

          <Divider />

          {/* ── Campos de Vínculo (Relacionamento com Entidades) ── */}
          <Label>Campos de Vínculo (Relacionamento com Entidades)</Label>
          <p className="text-[#4E6987] mb-[16px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Campos que vinculam um registro a outra entidade (Conta, Contato, Oportunidade). Usam o ícone <code className="bg-[#f6f7f9] px-[4px] rounded-[4px] text-[#0483AB]">LinkSimpleHorizontal</code> como indicador de vínculo, com as cores da entidade-alvo no ícone e valor clicável.
          </p>

          <div className="flex items-start gap-[16px] flex-wrap mb-[6px]">
            {/* Vinculado a — Conta */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Conta
                </span>
                <LinkSimpleHorizontal size={10} weight="bold" className="text-[#98989d]" />
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <Building size={14} weight="duotone" className="text-[#3CCEA7] shrink-0" />
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Alpha Tecnologia
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Vinculado a — Lead */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Lead
                </span>
                <LinkSimpleHorizontal size={10} weight="bold" className="text-[#98989d]" />
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <Heart size={14} weight="duotone" className="text-[#EAC23D] shrink-0" />
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Expansão Enterprise
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Vinculado a — Contato */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Contato
                </span>
                <LinkSimpleHorizontal size={10} weight="bold" className="text-[#98989d]" />
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <IdentificationCard size={14} weight="duotone" className="text-[#FF8C76] shrink-0" />
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  João Mendes
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Vinculado a — Oportunidade */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Oportunidade
                </span>
                <LinkSimpleHorizontal size={10} weight="bold" className="text-[#98989d]" />
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <SketchLogo size={14} weight="duotone" className="text-[#07ABDE] shrink-0" />
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Projeto ERP 2026
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>

            {/* Vinculado a — Vazio */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[160px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Vinculado a
                </span>
                <LinkSimpleHorizontal size={10} weight="bold" className="text-[#98989d]" />
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <span className="text-[#c8cfdb]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  —
                </span>
              </div>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            ícone label: LinkSimpleHorizontal size=10 bold · ícone entidade: size=14 duotone com cor da entidade (Conta=#3CCEA7, Contato=#FF8C76, Oportunidade=#07ABDE) · valor: text-[#0483AB] clicável · vazio: text-[#c8cfdb] &quot;—&quot;
          </span>

          {/* ── Estado: Editando vínculo existente ── */}
          <Label>Estado: Editando vínculo existente</Label>
          <p className="text-[#4E6987] mb-[16px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Ao clicar para editar um campo de vínculo que já possui um registro associado, um popover exibe o registro atual com ações contextuais e um campo de busca para trocar o vínculo.
          </p>

          <div className="flex items-start gap-[24px] flex-wrap mb-[6px]">
            {/* Campo ativo + popover */}
            <div className="relative min-w-[260px]">
              {/* Campo em estado editing */}
              <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#07abde] cursor-pointer transition-all">
                <div className="flex items-center gap-[4px]">
                  <span className="text-[#07abde] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                    Conta
                  </span>
                  <LinkSimpleHorizontal size={10} weight="bold" className="text-[#07abde]" />
                </div>
                <div className="flex items-center gap-[6px] min-h-[22px]">
                  <Building size={14} weight="duotone" className="text-[#3CCEA7] shrink-0" />
                  <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                    Alpha Tecnologia
                  </span>
                </div>
                <div className="absolute right-[5px] top-[10px]">
                  <span className="flex items-center justify-center size-[16px] rounded-full bg-[#dcf0ff] text-[#07abde] cursor-pointer">
                    <X size={9} weight="bold" />
                  </span>
                </div>
              </div>

              {/* Popover dropdown */}
              <div
                className="mt-[4px] w-[280px] bg-white rounded-[12px] z-10 overflow-hidden"
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)" }}
              >
                {/* Registro atual */}
                <div className="px-[12px] pt-[10px] pb-[6px]">
                  <span className="text-[#98989d] uppercase block mb-[6px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...fontFeature }}>
                    Registro vinculado
                  </span>
                  <div className="flex items-center gap-[8px] p-[8px] rounded-[8px] bg-[#f6f7f9]">
                    <div className="flex items-center justify-center size-[28px] rounded-[8px] shrink-0" style={{ backgroundColor: "#D9F8EF" }}>
                      <Building size={14} weight="duotone" className="text-[#3CCEA7]" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[#28415c] truncate" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...fontFeature }}>
                        Alpha Tecnologia
                      </span>
                      <span className="text-[#98989d]" style={{ fontSize: 10, fontWeight: 500, ...fontFeature }}>
                        Tecnologia · São Paulo, SP
                      </span>
                    </div>
                    <button className="flex items-center justify-center size-[24px] rounded-full hover:bg-[#DCF0FF] text-[#0483AB] transition-colors shrink-0 cursor-pointer" title="Abrir registro">
                      <ArrowSquareOut size={13} weight="bold" />
                    </button>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-[1px] bg-[#eceef1] mx-[12px]" />

                {/* Trocar vínculo — search */}
                <div className="px-[12px] py-[6px]">
                  <div
                    className="flex items-center gap-[8px] h-[34px] px-[10px] rounded-[8px] bg-[#DDE3EC]"
                    style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}
                  >
                    <MagnifyingGlass size={13} weight="bold" className="text-[#98989d] shrink-0" />
                    <span className="text-[#c8cfdb]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}>
                      Buscar outra conta...
                    </span>
                  </div>
                </div>

                {/* Remover vínculo */}
                <div className="px-[12px] pb-[10px] pt-[2px]">
                  <button className="flex items-center gap-[6px] w-full h-[32px] px-[10px] rounded-[8px] bg-[#F6F7F9] hover:bg-[#FFEDEB] text-[#F56233] transition-colors cursor-pointer">
                    <LinkBreak size={13} weight="bold" />
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                      Remover vínculo
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Anotação visual do padrão */}
            <div className="flex flex-col gap-[8px] max-w-[260px] pt-[4px]">
              <div className="flex items-start gap-[6px]">
                <span className="size-[6px] rounded-full bg-[#07ABDE] mt-[5px] shrink-0" />
                <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, lineHeight: "16px", ...fontFeature }}>
                  Campo entra em estado <strong>editing</strong> (borda e label azul)
                </span>
              </div>
              <div className="flex items-start gap-[6px]">
                <span className="size-[6px] rounded-full bg-[#3CCEA7] mt-[5px] shrink-0" />
                <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, lineHeight: "16px", ...fontFeature }}>
                  Registro atual exibido com ícone da entidade, nome e meta-info
                </span>
              </div>
              <div className="flex items-start gap-[6px]">
                <span className="size-[6px] rounded-full bg-[#0483AB] mt-[5px] shrink-0" />
                <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, lineHeight: "16px", ...fontFeature }}>
                  <strong>ArrowSquareOut</strong> — abre o registro vinculado
                </span>
              </div>
              <div className="flex items-start gap-[6px]">
                <span className="size-[6px] rounded-full bg-[#DDE3EC] mt-[5px] shrink-0" />
                <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, lineHeight: "16px", ...fontFeature }}>
                  Search input padrão do DS para trocar vínculo
                </span>
              </div>
              <div className="flex items-start gap-[6px]">
                <span className="size-[6px] rounded-full bg-[#F56233] mt-[5px] shrink-0" />
                <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, lineHeight: "16px", ...fontFeature }}>
                  <strong>Remover vínculo</strong> — ação destrutiva (vermelho)
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[4px]" style={{ fontSize: 10 }}>
            popover: bg-white rounded-[12px] shadow · registro: bg-[#f6f7f9] rounded-[8px] com ícone entidade 28px · abrir: ArrowSquareOut hover:bg-[#DCF0FF] · busca: padrão DS bg-[#DDE3EC] inner shadow · remover: text-[#F56233] hover:bg-[#FFEDEB]
          </span>

        </Card>