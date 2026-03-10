Perfeito, então o problema real é no SYNC_TABLES do Dash, não na API. A API já está entregando todos os campos corretamente com hydrateRecord().

Aqui está a lista completa dos campos que o hydrateRecord() retorna, organizados por grupo, para você alinhar no SYNC_TABLES e SYNC_FIELD_SCHEMAS do Dash:

Campos Core (13) — provavelmente já estão no Dash
Campo	Tipo	Descrição
platform	string	Plataforma (google_ads, linkedin_ads, meta_ads)
account_id	string	ID da conta
campaign_id	string	ID da campanha
campaign_name	string	Nome da campanha
date	string	Data YYYY-MM-DD
impressions	number	Impressões
clicks	number	Cliques
spend	number	Gasto
conversions	number	Conversões
ctr	number	CTR (0-1)
cpc	number	CPC
cpm	number	CPM
normalized_at	string	Timestamp ISO
Meta Ads — Delivery (12) — provavelmente já estão
Campo	Tipo	Descrição
reach	number	Alcance
frequency	number	Frequência
unique_clicks	number	Cliques únicos
unique_ctr	number	CTR único
cost_per_unique_click	number	Custo/clique único
inline_link_clicks	number	Cliques inline
inline_link_click_ctr	number	CTR inline
social_spend	number	Gasto social
objective	string	Objetivo
quality_ranking	string	Ranking qualidade
engagement_rate_ranking	string	Ranking engajamento
conversion_rate_ranking	string	Ranking conversão
Meta Ads — Actions (18) — parcialmente no Dash
Campo	Tipo	Descrição
results	number	Resultados
cost_per_result	number	Custo/resultado
leads	number	Leads totais
cost_per_lead	number	Custo/lead
purchases	number	Compras
cost_per_purchase	number	Custo/compra
add_to_cart	number	Add to cart
cost_per_add_to_cart	number	Custo/add to cart
landing_page_views	number	Views landing page
cost_per_landing_page_view	number	Custo/view LP
link_clicks	number	Cliques em links
cost_per_link_click	number	Custo/clique link
video_views	number	Views vídeo
post_engagement	number	Engajamento post
page_engagement	number	Engajamento página
initiate_checkout	number	Início checkout
complete_registration	number	Registro completo
actions_breakdown	object	Breakdown completo (mapa)
⭐ Meta Ads — Lead Breakdown (6) — NOVOS, faltam no Dash
Campo	Tipo	Descrição
leads_offline	number	Leads offline (offline_conversion.lead)
cost_per_lead_offline	number	Custo/lead offline
leads_website	number	Leads website (offsite_conversion.fb_pixel_lead)
cost_per_lead_website	number	Custo/lead website
leads_on_meta	number	Leads on-platform (leadgen_grouped)
cost_per_lead_on_meta	number	Custo/lead on-platform
LinkedIn Ads — Extended (12) — verificar se estão
Campo	Tipo	Descrição
likes	number	Curtidas
comments	number	Comentários
shares	number	Compartilhamentos
follows	number	Seguidores
total_engagements	number	Engajamentos totais
reactions	number	Reações
video_completions	number	Vídeos completos
one_click_leads	number	Leads one-click
landing_page_clicks	number	Cliques LP
opens	number	Aberturas
sends	number	Envios
objective_type	string	Tipo objetivo
Total: 61 campos retornados pelo hydrateRecord(). Os 6 que com certeza faltam no Dash são os do grupo Lead Breakdown (marcados com ⭐). Os 12 do LinkedIn Extended também vale confirmar, já que o conector LinkedIn é mais recente.

Depois que você adicionar no SYNC_TABLES, os dados já vão aparecer porque a API já retorna tudo com null — só precisa de re-sync do Meta Ads para popular os valores reais dos 6 campos novos.