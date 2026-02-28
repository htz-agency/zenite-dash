cube(`proposal_services`, {
  sql_table: `public.crm_opportunity_services`,

  joins: {
    proposals: {
      sql: `${CUBE}.opportunity_id = ${proposals}.opportunity_id`,
      relationship: `many_to_one`,
    },
  },

  measures: {
    count: { type: `count` },
    total_base_price: { type: `sum`, sql: `base_price` },
    total_impl_price: { type: `sum`, sql: `impl_price` },
    total_hours: { type: `sum`, sql: `hours` },
    total_quantity: { type: `sum`, sql: `quantity` },
    avg_base_price: { type: `avg`, sql: `base_price` },
  },

  dimensions: {
    service_id: { sql: `service_id`, type: `string`, primary_key: true },
    opportunity_id: { sql: `opportunity_id`, type: `string` },
    name: { sql: `name`, type: `string` },
    group: { sql: `${CUBE}."group"`, type: `string` },
    quantity: { sql: `quantity`, type: `number` },
    base_price: { sql: `base_price`, type: `number` },
    impl_price: { sql: `impl_price`, type: `number` },
    hours: { sql: `hours`, type: `number` },
  },
});
