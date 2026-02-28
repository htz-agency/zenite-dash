cube(`field_history`, {
  sql_table: `public.crm_field_history`,

  measures: {
    count: { type: `count` },
    unique_entities: { type: `count_distinct`, sql: `entity_id` },
    unique_fields: { type: `count_distinct`, sql: `field_name` },
  },

  dimensions: {
    id: { sql: `id`, type: `string`, primary_key: true },
    entity_type: { sql: `entity_type`, type: `string` },
    entity_id: { sql: `entity_id`, type: `string` },
    field_name: { sql: `field_name`, type: `string` },
    old_value: { sql: `old_value`, type: `string` },
    new_value: { sql: `new_value`, type: `string` },
    changed_by: { sql: `changed_by`, type: `string` },
    change_source: { sql: `change_source`, type: `string` },
    changed_at: { sql: `changed_at`, type: `time` },
  },
});
