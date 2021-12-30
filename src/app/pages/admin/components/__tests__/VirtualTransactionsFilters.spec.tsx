import React from 'react'
import { render } from 'test-utils'
import Box from '@material-ui/core/Box'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { VTTransferTypesFilter } from 'app/pages/admin/components/VTTransferTypesFilter'
import { VirtualTransactionsFilters } from 'app/pages/admin/components/VirtualTransactionsFilters'
import { SearchFilter } from 'app/components/SearchFilter'
import { VTDateFilter } from 'app/pages/admin/components/VTDateFilter'
import { VTCurrencyFilter } from 'app/pages/admin/components/VTCurrencyFilter'
import { VTDirectionFilter } from 'app/pages/admin/components/VTDirectionFilter'
import { VSpacer } from 'components/VSpacer'

jest.mock('@material-ui/core/Box', () => jest.fn(() => null))

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/VTDateFilter', () => ({
  VTDateFilter: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/VTCurrencyFilter', () => ({
  VTCurrencyFilter: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/VTTransferTypesFilter', () => ({
  VTTransferTypesFilter: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/VTDirectionFilter', () => ({
  VTDirectionFilter: jest.fn(() => null)
}))

describe('VirtualTransactionsFilters', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<VirtualTransactionsFilters />)
  })

  it('renders empty box components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: true
    } as any)
    render(<VirtualTransactionsFilters />)
    expect(Box).toHaveBeenCalledTimes(0)
  })

  it('renders empty box components when isMobile is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: false
    } as any)
    render(<VirtualTransactionsFilters />)
    expect(Box).toHaveBeenCalledTimes(2)
  })

  it('renders search filter with correct props', () => {
    render(<VirtualTransactionsFilters />)
    expect(SearchFilter).toHaveBeenCalledTimes(1)
    expect(SearchFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        fullWidth: true,
        placeholder: 'Search virtual account/ SWIFT',
        inputAdornmentPosition: 'start'
      }),
      {}
    )
  })

  it('renders VSpacer components with correct props', () => {
    render(<VirtualTransactionsFilters />)
    expect(VSpacer).toHaveBeenCalledTimes(2)
    expect(VSpacer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )

    expect(VSpacer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        size: 'extraSmall'
      }),
      {}
    )
  })

  it('renders date filter', () => {
    render(<VirtualTransactionsFilters />)
    expect(VTDateFilter).toHaveBeenCalledTimes(1)
  })

  it('renders currency filter', () => {
    render(<VirtualTransactionsFilters />)
    expect(VTCurrencyFilter).toHaveBeenCalledTimes(1)
  })

  it('renders transaction transfer type filter', () => {
    render(<VirtualTransactionsFilters />)
    expect(VTTransferTypesFilter).toHaveBeenCalledTimes(1)
  })

  it('renders transaction direction filter', () => {
    render(<VirtualTransactionsFilters />)
    expect(VTDirectionFilter).toHaveBeenCalledTimes(1)
  })
})
