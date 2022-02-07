import { columns } from 'app/pages/issuance/components/FinancialReportsTable/columns'
import { cleanup } from 'test-utils'

describe('columns', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders correct keys', () => {
    expect(columns[0].key).toBe('createdAt')
    expect(columns[1].key).toBe('dateFrom')
    expect(columns[2].key).toBe('reportDocuments')
    expect(columns[3].key).toBe('dso')
  })
})
