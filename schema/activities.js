cube(`activities`, {
  sql_table: `public.crm_activities`,

  joins: {
    leads: {
      sql: `${CUBE}.entity_id = ${leads}.id AND ${CUBE}.entity_type = 'lead'`,
      relationship: `many_to_one`,
    },
    opportunities: {
      sql: `${CUBE}.entity_id = ${opportunities}.id AND ${CUBE}.entity_type = 'opportunity'`,
      relationship: `many_to_one`,
    },
    contacts: {
      sql: `${CUBE}.contact_id = ${contacts}.id`,
      relationship: `many_to_one`,
    },
  },

  measures: {
    count: { type: `count` },
    completed_count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.completed_at IS NOT NULL` }],
    },
    pending_count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.completed_at IS NULL AND (${CUBE}.status IS NULL OR LOWER(${CUBE}.status) NOT IN ('concluida', 'completed', 'done', 'cancelada', 'cancelled'))` }],
    },
    overdue_count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.completed_at IS NULL AND ${CUBE}.due_date < NOW()` }],
    },
    completion_rate: {
      type: `number`,
      sql: `CASE WHEN ${count} > 0 THEN ROUND((${completed_count}::numeric / ${count}::numeric) * 100, 2) ELSE 0 END`,
    },
    avg_completion_hours: {
      type: `avg`,
      sql: `EXTRACT(EPOCH FROM (${CUBE}.completed_at - ${CUBE}.created_at)) / 3600.0`,
      filters: [{ sql: `${CUBE}.completed_at IS NOT NULL` }],
    },
    total_call_duration: { type: `sum`, sql: `call_duration` },
    avg_call_duration: { type: `avg`, sql: `call_duration` },
  },

  dimensions: {
    id: { sql: `id`, type: `string`, primary_key: true },
    type: { sql: `type`, type: `string` },
    label: { sql: `label`, type: `string` },
    subject: { sql: `subject`, type: `string` },
    description: { sql: `description`, type: `string` },
    status: { sql: `status`, type: `string` },
    priority: { sql: `priority`, type: `string` },
    owner: { sql: `owner`, type: `string` },
    assigned_to: { sql: `assigned_to`, type: `string` },
    entity_type: { sql: `entity_type`, type: `string` },
    entity_id: { sql: `entity_id`, type: `string` },
    related_to_type: { sql: `related_to_type`, type: `string` },
    related_to_name: { sql: `related_to_name`, type: `string` },
    contact_name: { sql: `contact_name`, type: `string` },
    contact_id: { sql: `contact_id`, type: `string` },
    location: { sql: `location`, type: `string` },
    all_day: { sql: `all_day`, type: `boolean` },
    is_private: { sql: `is_private`, type: `boolean` },
    is_recurring: { sql: `is_recurring`, type: `boolean` },
    tags: { sql: `tags`, type: `string` },
    channel: { sql: `channel`, type: `string` },
    call_type: { sql: `call_type`, type: `string` },
    call_direction: { sql: `call_direction`, type: `string` },
    call_result: { sql: `call_result`, type: `string` },
    busy_status: { sql: `busy_status`, type: `string` },
    calendar_name: { sql: `calendar_name`, type: `string` },
    created_by: { sql: `created_by`, type: `string` },
    created_at: { sql: `created_at`, type: `time` },
    updated_at: { sql: `updated_at`, type: `time` },
    due_date: { sql: `due_date`, type: `time` },
    start_date: { sql: `start_date`, type: `time` },
    end_date: { sql: `end_date`, type: `time` },
    completed_at: { sql: `completed_at`, type: `time` },
    type_group: {
      type: `string`,
      case: {
        when: [
          { sql: `LOWER(${CUBE}.type::text) SIMILAR TO '%(tarefa|task)%'`, label: `Tarefa` },
          { sql: `LOWER(${CUBE}.type::text) SIMILAR TO '%(compromisso|evento|event|reuniao|meeting|calendar)%'`, label: `Compromisso` },
          { sql: `LOWER(${CUBE}.type::text) SIMILAR TO '%(ligacao|call|telefone)%'`, label: `Ligacao` },
          { sql: `LOWER(${CUBE}.type::text) SIMILAR TO '%(email|e-mail)%'`, label: `Email` },
          { sql: `LOWER(${CUBE}.type::text) SIMILAR TO '%(nota|note|anotacao)%'`, label: `Nota` },
          { sql: `LOWER(${CUBE}.type::text) SIMILAR TO '%(mensagem|message|whatsapp|sms|chat)%'`, label: `Mensagem` },
        ],
        else: { label: `Outro` },
      },
    },
    status_group: {
      type: `string`,
      case: {
        when: [
          { sql: `${CUBE}.completed_at IS NOT NULL`, label: `Concluida` },
          { sql: `${CUBE}.due_date < NOW() AND ${CUBE}.completed_at IS NULL`, label: `Atrasada` },
        ],
        else: { label: `Pendente` },
      },
    },
  },
});
