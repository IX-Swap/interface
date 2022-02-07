import { columns } from 'app/pages/issuance/components/FinancialReportsTable/columns'
import { cleanup } from 'test-utils'

describe('columns', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders correct keys', () => {
    expect(columns[0].key).toBe('creationDate')
    expect(columns[1].key).toBe('reportInterval')
    expect(columns[2].key).toBe('type')
    expect(columns[3].key).toBe('reportOf')
  })
})
