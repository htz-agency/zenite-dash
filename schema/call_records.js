cube(`call_records`, {
  sql_table: `public.crm_call_records`,

  joins: {
    activities: {
      sql: `${CUBE}.activity_id = ${activities}.id`,
      relationship: `many_to_one`,
    },
  },

  measures: {
    count: { type: `count` },
    unique_phones: { type: `count_distinct`, sql: `phone` },
  },

  dimensions: {
    id: { sql: `id`, type: `string`, primary_key: true },
    phone: { sql: `phone`, type: `string` },
    date: { sql: `date`, type: `string` },
    entity_type: { sql: `entity_type`, type: `string` },
    entity_id: { sql: `entity_id`, type: `string` },
    activity_id: { sql: `activity_id`, type: `string` },
    direction: { sql: `direction`, type: `string` },
    title: { sql: `title`, type: `string` },
    duration: { sql: `duration`, type: `string` },
    notes: { sql: `notes`, type: `string` },
    created_at: { sql: `created_at`, type: `time` },
    updated_at: { sql: `updated_at`, type: `time` },
  },
});
