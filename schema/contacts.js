cube(`contacts`, {
  sql: `SELECT * FROM public.crm_contacts WHERE is_deleted = false`,

  joins: {
    accounts: {
      sql: `${CUBE}.account = ${accounts}.name`,
      relationship: `many_to_one`,
    },
    activities: {
      sql: `${CUBE}.id = ${activities}.contact_id`,
      relationship: `one_to_many`,
    },
  },

  measures: {
    count: { type: `count` },
    with_email_count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.email IS NOT NULL AND ${CUBE}.email != ''` }],
    },
    with_phone_count: {
      type: `count`,
      filters: [{ sql: `(${CUBE}.phone IS NOT NULL AND ${CUBE}.phone != '') OR (${CUBE}.mobile IS NOT NULL AND ${CUBE}.mobile != '')` }],
    },
    contactable_count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.do_not_contact IS DISTINCT FROM true` }],
    },
  },

  dimensions: {
    id: { sql: `id`, type: `string`, primary_key: true },
    name: { sql: `COALESCE(${CUBE}.name, '') || ' ' || COALESCE(${CUBE}.last_name, '')`, type: `string` },
    first_name: { sql: `name`, type: `string` },
    last_name: { sql: `last_name`, type: `string` },
    role: { sql: `role`, type: `string` },
    department: { sql: `department`, type: `string` },
    company: { sql: `company`, type: `string` },
    account: { sql: `account`, type: `string` },
    phone: { sql: `phone`, type: `string` },
    mobile: { sql: `mobile`, type: `string` },
    email: { sql: `email`, type: `string` },
    linkedin: { sql: `linkedin`, type: `string` },
    website: { sql: `website`, type: `string` },
    address: { sql: `address`, type: `string` },
    stage: { sql: `stage`, type: `string` },
    owner: { sql: `owner`, type: `string` },
    origin: { sql: `origin`, type: `string` },
    preferred_contact: { sql: `preferred_contact`, type: `string` },
    do_not_contact: { sql: `do_not_contact`, type: `boolean` },
    tags: { sql: `tags`, type: `string` },
    is_deleted: { sql: `is_deleted`, type: `boolean` },
    created_by: { sql: `created_by`, type: `string` },
    created_at: { sql: `created_at`, type: `time` },
    updated_at: { sql: `updated_at`, type: `time` },
    last_activity_date: { sql: `last_activity_date`, type: `time` },
    birth_date: { sql: `birth_date`, type: `time` },
  },
});
