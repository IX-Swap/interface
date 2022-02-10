import { columns } from 'app/pages/issuance/components/FinancialReportsTable/columns'

describe('columns', () => {
  it('renders correct keys', () => {
    expect(columns[0].key).toBe('createdAt')
    expect(columns[1].key).toBe('dateFrom')
    expect(columns[2].key).toBe('reportDocuments')
    expect(columns[3].key).toBe('dso')
  })
})
