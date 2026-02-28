cube(`accounts`, {
  sql: `SELECT * FROM public.crm_accounts WHERE is_deleted = false`,

  joins: {
    contacts: {
      sql: `${CUBE}.name = ${contacts}.account`,
      relationship: `one_to_many`,
    },
    opportunities: {
      sql: `${CUBE}.name = ${opportunities}.account`,
      relationship: `one_to_many`,
    },
  },

  measures: {
    count: { type: `count` },
    total_revenue: { type: `sum`, sql: `annual_revenue` },
    avg_revenue: { type: `avg`, sql: `annual_revenue` },
    total_employees: { type: `sum`, sql: `employees` },
    avg_employees: { type: `avg`, sql: `employees` },
    total_contacts: { type: `sum`, sql: `contacts` },
    with_partner_count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.partner_account = true` }],
    },
  },

  dimensions: {
    id: { sql: `id`, type: `string`, primary_key: true },
    name: { sql: `name`, type: `string` },
    type: { sql: `type`, type: `string` },
    stage: { sql: `stage`, type: `string` },
    owner: { sql: `owner`, type: `string` },
    sector: { sql: `sector`, type: `string` },
    website: { sql: `website`, type: `string` },
    phone: { sql: `phone`, type: `string` },
    email: { sql: `email`, type: `string` },
    cnpj: { sql: `cnpj`, type: `string` },
    annual_revenue: { sql: `annual_revenue`, type: `number` },
    employees: { sql: `employees`, type: `number` },
    rating: { sql: `rating`, type: `string` },
    origin: { sql: `origin`, type: `string` },
    ownership: { sql: `ownership`, type: `string` },
    partner_account: { sql: `partner_account`, type: `boolean` },
    segment: { sql: `segment`, type: `string` },
    do_not_contact: { sql: `do_not_contact`, type: `boolean` },
    tags: { sql: `tags`, type: `string` },
    mkt_campanha: { sql: `mkt_campanha`, type: `string` },
    mkt_canal: { sql: `mkt_canal`, type: `string` },
    is_deleted: { sql: `is_deleted`, type: `boolean` },
    billing_city: { sql: `billing_city`, type: `string` },
    billing_state: { sql: `billing_state`, type: `string` },
    billing_country: { sql: `billing_country`, type: `string` },
    shipping_city: { sql: `shipping_city`, type: `string` },
    shipping_state: { sql: `shipping_state`, type: `string` },
    created_by: { sql: `created_by`, type: `string` },
    created_at: { sql: `created_at`, type: `time` },
    updated_at: { sql: `updated_at`, type: `time` },
    last_activity_date: { sql: `last_activity_date`, type: `time` },
    revenue_range: {
      type: `string`,
      case: {
        when: [
          { sql: `${CUBE}.annual_revenue IS NULL OR ${CUBE}.annual_revenue = 0`, label: `Sem receita` },
          { sql: `${CUBE}.annual_revenue < 100000`, label: `< R$100k` },
          { sql: `${CUBE}.annual_revenue < 500000`, label: `R$100k - R$500k` },
          { sql: `${CUBE}.annual_revenue < 1000000`, label: `R$500k - R$1M` },
        ],
        else: { label: `> R$1M` },
      },
    },
    size: {
      type: `string`,
      case: {
        when: [
          { sql: `${CUBE}.employees IS NULL OR ${CUBE}.employees = 0`, label: `Desconhecido` },
          { sql: `${CUBE}.employees <= 10`, label: `Micro` },
          { sql: `${CUBE}.employees <= 50`, label: `Pequena` },
          { sql: `${CUBE}.employees <= 250`, label: `Media` },
        ],
        else: { label: `Grande` },
      },
    },
  },
});
