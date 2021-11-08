import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { CustodySearchFilter } from 'app/pages/admin/components/CustodySearchFilter/CustodySearchFilter'
import { CustodiansFilter } from 'app/pages/admin/components/CustodiansFilter/CustodiansFilter'
import { CustodyDatesFilter } from 'app/pages/admin/components/CustodyDatesFilter/CustodyDatesFilter'

jest.mock('app/pages/admin/components/CustodySearchFilter', () => ({
  CustodySearchFilter: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/CustodiansFilter', () => ({
  CustodiansFilter: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/CustodyDatesFilter', () => ({
  CustodyDatesFilter: jest.fn(() => null)
}))

describe('CustodyManagementFilters', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodyManagementFilters />)
  })

  it('renders search filter component', () => {
    render(<CustodyManagementFilters />)
    expect(CustodySearchFilter).toHaveBeenCalledTimes(1)
  })

  it('renders custodians filter component', () => {
    render(<CustodyManagementFilters />)
    expect(CustodiansFilter).toHaveBeenCalledTimes(1)
  })

  it('renders dates filter component', () => {
    render(<CustodyManagementFilters />)
    expect(CustodyDatesFilter).toHaveBeenCalledTimes(1)
  })
})
