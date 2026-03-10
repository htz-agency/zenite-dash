<Card>
          <SectionTitle>Tipos de Campos</SectionTitle>
          <SectionSubtitle>Catálogo completo dos tipos de campo disponíveis no editor de campos do CRM. Cada tipo possui ícone, cor e fundo próprios — agrupados por categoria funcional.</SectionSubtitle>

          {/* Texto & Comunicação */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Texto & Comunicação
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: TextT, label: "Texto", color: "#4e6987", bg: "#f0f2f5", desc: "Campo de texto simples" },
              { icon: TextAlignLeft, label: "Texto Longo", color: "#4e6987", bg: "#f0f2f5", desc: "Múltiplas linhas / rich text" },
              { icon: Phone, label: "Telefone", color: "#3ccea7", bg: "#d9f8ef", desc: "Formatação automática BR" },
              { icon: EnvelopeSimple, label: "Email", color: "#07abde", bg: "#dcf0ff", desc: "Validação de e-mail" },
              { icon: LinkSimpleHorizontal, label: "Link", color: "#07abde", bg: "#dcf0ff", desc: "URL com validação" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Data & Tempo */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Data & Tempo
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: Calendar, label: "Data", color: "#eac23d", bg: "#feedca", desc: "Seletor de data" },
              { icon: Timer, label: "Hora", color: "#eac23d", bg: "#feedca", desc: "Campo de hora (12h/24h)" },
              { icon: Calendar, label: "Data e Hora", color: "#eac23d", bg: "#feedca", desc: "Data e hora combinados" },
              { icon: Timer, label: "Duração", color: "#eac23d", bg: "#feedca", desc: "Tempo em min/h/dias" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Numérico & Monetário */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Numérico & Monetário
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: Hash, label: "Número", color: "#8c8cd4", bg: "#e8e8fd", desc: "Casas decimais, mín/máx" },
              { icon: Percent, label: "Porcentagem", color: "#8c8cd4", bg: "#e8e8fd", desc: "Precisão configurável" },
              { icon: CurrencyDollar, label: "Moeda", color: "#3ccea7", bg: "#d9f8ef", desc: "Valor monetário com símbolo" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Seleção & Listas */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Seleção & Listas
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: ListBullets, label: "Lista", color: "#ff8c76", bg: "#ffedeb", desc: "Seleção única (picklist)" },
              { icon: Tag, label: "Multi-seleção", color: "#ff8c76", bg: "#ffedeb", desc: "Seleção múltipla" },
              { icon: CaretCircleUpDown, label: "Combobox", color: "#ff8c76", bg: "#ffedeb", desc: "Dropdown com busca" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Referência & Estrutura */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Referência & Estrutura
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: UserCircle, label: "Usuário", color: "#07abde", bg: "#dcf0ff", desc: "Referência a usuário do sistema" },
              { icon: ToggleLeft, label: "Booleano", color: "#3ccea7", bg: "#d9f8ef", desc: "Toggle sim/não" },
              { icon: MapPin, label: "Endereço", color: "#4e6987", bg: "#f0f2f5", desc: "Endereço completo com sub-campos" },
              { icon: LinkSimpleHorizontal, label: "Associação", color: "#07abde", bg: "#dcf0ff", desc: "Referência a outro objeto CRM" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sistema & Automação */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Sistema & Automação
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: Shapes, label: "Contextual", color: "#8C8CD4", bg: "#e8e8fd", desc: "Opções dinâmicas por contexto" },
              { icon: FunctionIcon, label: "Calculado", color: "#8C8CD4", bg: "#e8e8fd", desc: "Valor gerado por fórmula" },
              { icon: Fingerprint, label: "ID", color: "#98989d", bg: "#f0f2f5", desc: "Identificador único do registro" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <span className="text-[#98989d] font-mono block mb-[4px]" style={{ fontSize: 10 }}>
            card: h-[38px] rounded-[10px] border-[#eceef1] · ícone: size-[26px] rounded-[7px] bg=tipo.bg · icon: size=14 duotone color=tipo.color · label: 12px/600 · desc: 9px/500
          </span>

        </Card>