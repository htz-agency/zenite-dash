cube(`opportunities`, {
  sql_table: `public.crm_opportunities`,

  joins: {
    accounts: {
      sql: `${CUBE}.account = ${accounts}.name`,
      relationship: `many_to_one`,
    },
    activities: {
      sql: `${CUBE}.id = ${activities}.entity_id AND ${activities}.entity_type = 'opportunity'`,
      relationship: `one_to_many`,
    },
    proposals: {
      sql: `${CUBE}.id = ${proposals}.opportunity_id`,
      relationship: `one_to_many`,
    },
  },

  measures: {
    count: { type: `count` },
    total_value: { type: `sum`, sql: `value` },
    avg_value: { type: `avg`, sql: `value` },
    max_value: { type: `max`, sql: `value` },
    min_value: { type: `min`, sql: `value` },
    avg_score: { type: `avg`, sql: `score` },
    weighted_pipeline: {
      type: `number`,
      sql: `SUM(${CUBE}.value * COALESCE(${CUBE}.score, 10) / 100.0)`,
    },
    won_count: {
      type: `count`,
      filters: [{ sql: `LOWER(${CUBE}.stage::text) SIMILAR TO '%(ganho|ganha|won)%'` }],
    },
    lost_count: {
      type: `count`,
      filters: [{ sql: `LOWER(${CUBE}.stage::text) SIMILAR TO '%(perdid|lost)%'` }],
    },
    open_count: {
      type: `count`,
      filters: [{ sql: `LOWER(${CUBE}.stage::text) NOT SIMILAR TO '%(ganho|ganha|won|perdid|lost)%'` }],
    },
    won_value: {
      type: `sum`,
      sql: `value`,
      filters: [{ sql: `LOWER(${CUBE}.stage::text) SIMILAR TO '%(ganho|ganha|won)%'` }],
    },
    lost_value: {
      type: `sum`,
      sql: `value`,
      filters: [{ sql: `LOWER(${CUBE}.stage::text) SIMILAR TO '%(perdid|lost)%'` }],
    },
    win_rate: {
      type: `number`,
      sql: `CASE WHEN (${won_count} + ${lost_count}) > 0 THEN ROUND((${won_count}::numeric / (${won_count} + ${lost_count})::numeric) * 100, 2) ELSE 0 END`,
    },
    avg_days_to_close: {
      type: `avg`,
      sql: `EXTRACT(EPOCH FROM (${CUBE}.close_date::timestamp - ${CUBE}.created_at)) / 86400.0`,
    },
  },

  dimensions: {
    id: { sql: `id`, type: `string`, primary_key: true },
    name: { sql: `name`, type: `string` },
    company: { sql: `company`, type: `string` },
    stage: { sql: `stage`, type: `string` },
    stage_complement: { sql: `stage_complement`, type: `string` },
    tipo: { sql: `tipo`, type: `string` },
    type: { sql: `type`, type: `string` },
    owner: { sql: `owner`, type: `string` },
    decisor: { sql: `decisor`, type: `string` },
    account: { sql: `account`, type: `string` },
    origin: { sql: `origin`, type: `string` },
    value: { sql: `value`, type: `number` },
    score: { sql: `score`, type: `number` },
    score_label: { sql: `score_label`, type: `string` },
    tag: { sql: `tag`, type: `string` },
    most_recent: { sql: `most_recent`, type: `boolean` },
    needs_objective: { sql: `needs_objective`, type: `string` },
    needs_budget: { sql: `needs_budget`, type: `string` },
    needs_timeline: { sql: `needs_timeline`, type: `string` },
    mkt_campanha: { sql: `mkt_campanha`, type: `string` },
    mkt_canal: { sql: `mkt_canal`, type: `string` },
    mkt_anuncio: { sql: `mkt_anuncio`, type: `string` },
    mkt_grupo_anuncios: { sql: `mkt_grupo_anuncios`, type: `string` },
    created_by: { sql: `created_by`, type: `string` },
    created_at: { sql: `created_at`, type: `time` },
    updated_at: { sql: `updated_at`, type: `time` },
    close_date: { sql: `close_date`, type: `time` },
    last_activity_date: { sql: `last_activity_date`, type: `time` },
    mkt_ultima_conversao: { sql: `mkt_ultima_conversao`, type: `time` },
    stage_group: {
      type: `string`,
      case: {
        when: [
          { sql: `LOWER(${CUBE}.stage::text) SIMILAR TO '%(ganho|ganha|won)%'`, label: `Ganhas` },
          { sql: `LOWER(${CUBE}.stage::text) SIMILAR TO '%(perdid|lost)%'`, label: `Perdidas` },
        ],
        else: { label: `Em aberto` },
      },
    },
    value_range: {
      type: `string`,
      case: {
        when: [
          { sql: `${CUBE}.value IS NULL OR ${CUBE}.value = 0`, label: `Sem valor` },
          { sql: `${CUBE}.value < 5000`, label: `< R$5k` },
          { sql: `${CUBE}.value < 20000`, label: `R$5k - R$20k` },
          { sql: `${CUBE}.value < 50000`, label: `R$20k - R$50k` },
          { sql: `${CUBE}.value < 100000`, label: `R$50k - R$100k` },
        ],
        else: { label: `> R$100k` },
      },
    },
  },
});
