import React from 'react'
import { render } from 'test-utils'
import Box from '@material-ui/core/Box'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { VTCurrencyFilter } from 'app/pages/admin/components/VTCurrencyFilter'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'

jest.mock('@material-ui/core/Box', () => jest.fn(() => null))

jest.mock(
  'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter',
  () => ({
    CurrencyFilter: jest.fn(() => null)
  })
)

describe('VTCurrencyFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<VTCurrencyFilter />)
  })

  it('renders empty box components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)
    render(<VTCurrencyFilter />)
    expect(Box).toHaveBeenCalledTimes(0)
  })

  it('renders empty box components when isMobile is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false
    } as any)
    render(<VTCurrencyFilter />)
    expect(Box).toHaveBeenCalledTimes(2)
  })

  it('renders currency filter components with correct props', () => {
    render(<VTCurrencyFilter />)
    expect(CurrencyFilter).toHaveBeenCalledTimes(2)
    expect(CurrencyFilter).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ currency: 'SGD', defaultValue: null }),
      {}
    )
    expect(CurrencyFilter).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ currency: 'USD', defaultValue: null }),
      {}
    )
  })
})
