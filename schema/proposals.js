cube(`proposals`, {
  sql_table: `public.crm_opportunity_proposals`,

  joins: {
    opportunities: {
      sql: `${CUBE}.opportunity_id = ${opportunities}.id`,
      relationship: `many_to_one`,
    },
    proposal_services: {
      sql: `${CUBE}.proposal_id = ${proposal_services}.proposal_id`,
      relationship: `one_to_many`,
    },
  },

  measures: {
    count: { type: `count` },
    active_count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.active = true` }],
    },
    total_monthly: { type: `sum`, sql: `total_monthly` },
    total_impl: { type: `sum`, sql: `total_impl` },
    avg_monthly: { type: `avg`, sql: `total_monthly` },
    avg_impl: { type: `avg`, sql: `total_impl` },
  },

  dimensions: {
    id: { sql: `id`, type: `string`, primary_key: true },
    opportunity_id: { sql: `opportunity_id`, type: `string` },
    client_name: { sql: `client_name`, type: `string` },
    proposal_id: { sql: `proposal_id`, type: `string` },
    total_monthly_value: { sql: `total_monthly`, type: `number` },
    total_impl_value: { sql: `total_impl`, type: `number` },
    active: { sql: `active`, type: `boolean` },
    created_at: { sql: `created_at`, type: `time` },
    updated_at: { sql: `updated_at`, type: `time` },
  },
});
