import React from 'react'
import { render } from 'test-utils'
import { CustodyDatesFilter } from 'app/pages/admin/components/CustodyDatesFilter/CustodyDatesFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock(
  'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter',
  () => ({
    DateFilter: jest.fn(() => null)
  })
)

describe('CustodyDatesFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DateFilter components with correct props', () => {
    render(<CustodyDatesFilter />)
    expect(DateFilter).toHaveBeenCalledTimes(2)
    expect(DateFilter).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'fromDate',
        label: 'From',
        width: '100%'
      }),
      {}
    )
    expect(DateFilter).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'toDate',
        label: 'To',
        width: '100%'
      }),
      {}
    )
  })
})
