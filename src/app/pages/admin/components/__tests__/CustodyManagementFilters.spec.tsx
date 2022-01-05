import React from 'react'
import { render } from 'test-utils'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { CustodySearchFilter } from 'app/pages/admin/components/CustodySearchFilter/CustodySearchFilter'
import { CustodiansFilter } from 'app/pages/admin/components/CustodiansFilter/CustodiansFilter'
import { CustodyDatesFilter } from 'app/pages/admin/components/CustodyDatesFilter/CustodyDatesFilter'

jest.mock(
  'app/pages/admin/components/CustodySearchFilter/CustodySearchFilter',
  () => ({
    CustodySearchFilter: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/admin/components/CustodiansFilter/CustodiansFilter',
  () => ({
    CustodiansFilter: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/admin/components/CustodyDatesFilter/CustodyDatesFilter',
  () => ({
    CustodyDatesFilter: jest.fn(() => null)
  })
)

describe('CustodyManagementFilters', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders children', () => {
    render(<CustodyManagementFilters />)
    expect(CustodySearchFilter).toHaveBeenCalledTimes(1)
    expect(CustodiansFilter).toHaveBeenCalledTimes(1)
    expect(CustodyDatesFilter).toHaveBeenCalledTimes(1)
  })
})
