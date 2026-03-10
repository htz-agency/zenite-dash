<Card>
          <SectionTitle>Ícones de Entidades & Atividades</SectionTitle>
          <SectionSubtitle>Phosphor Icons, weight="duotone" para padrão, "fill" para ativo/selecionado, "bold" dentro de ActionButtons.</SectionSubtitle>

          <Label>Entidades do CRM</Label>
          <div className="flex items-center gap-[20px] mb-[20px]">
            {[
              { icon: Heart, label: "Lead", color: "#EAC23D", bg: "#FEEDCA" },
              { icon: Building, label: "Conta", color: "#3CCEA7", bg: "#D9F8EF" },
              { icon: IdentificationCard, label: "Contato", color: "#FF8C76", bg: "#FFEDEB" },
              { icon: SketchLogo, label: "Oportunidade", color: "#07ABDE", bg: "#DCF0FF" },
              { icon: Lightning, label: "Atividade", color: "#4E6987", bg: "#DDE3EC" },
            ].map((e) => (
              <div key={e.label} className="flex flex-col items-center gap-[6px]">
                <div
                  className="flex items-center justify-center size-[40px] rounded-[10px]"
                  style={{ backgroundColor: e.bg }}
                >
                  <e.icon size={20} weight="duotone" style={{ color: e.color }} />
                </div>
                <span className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, ...fontFeature }}>
                  {e.label}
                </span>
              </div>
            ))}
          </div>

          <Label>Tipos de Atividade (6 cores canônicas)</Label>
          <div className="flex items-center gap-[20px] mb-[8px]">
            {[
              { icon: CalendarBlank, label: "Compromisso", color: "#FF8C76", bg: "#FFEDEB" },
              { icon: CheckCircle, label: "Tarefa", color: "#8C8CD4", bg: "#E8E8FD" },
              { icon: Phone, label: "Ligação", color: "#3CCEA7", bg: "#D9F8EF" },
              { icon: NoteBlank, label: "Nota", color: "#EAC23D", bg: "#FEEDCA" },
              { icon: ChatCircle, label: "Mensagem", color: "#07ABDE", bg: "#DCF0FF" },
              { icon: Envelope, label: "Email", color: "#4E6987", bg: "#DDE3EC" },
            ].map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-[6px]">
                <div
                  className="flex items-center justify-center size-[40px] rounded-[10px]"
                  style={{ backgroundColor: a.bg }}
                >
                  <a.icon size={20} weight="duotone" style={{ color: a.color }} />
                </div>
                <span className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, ...fontFeature }}>
                  {a.label}
                </span>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 8 }}>{a.color}</span>
              </div>
            ))}
          </div>
        </Card>