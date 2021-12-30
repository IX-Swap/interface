import { columns } from 'app/pages/authorizer/pages/VirtualAccounts/columns'
import {} from 'test-utils'

describe('columns', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    expect(columns[0]).toEqual(
      expect.objectContaining({ key: 'assignedAt', label: 'Date' })
    )

    expect(columns[1]).toEqual(
      expect.objectContaining({
        key: 'user.name',
        label: 'Name'
      })
    )

    expect(columns[2]).toEqual(
      expect.objectContaining({
        key: 'currency',
        label: 'Currency'
      })
    )

    expect(columns[3]).toEqual(
      expect.objectContaining({
        key: 'accountNumber',
        label: 'Virtual Account No.'
      })
    )
  })
})
