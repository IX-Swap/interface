import React from 'react'
import { render, cleanup } from 'test-utils'
import Box from '@material-ui/core/Box'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { VTDateFilter } from 'app/pages/admin/components/VTDateFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'

jest.mock('@material-ui/core/Box', () => jest.fn(() => null))

jest.mock(
  'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter',
  () => ({
    CurrencyFilter: jest.fn(() => null)
  })
)

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock(
  'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter',
  () => ({
    DateFilter: jest.fn(() => null)
  })
)

describe('VTDateFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VTDateFilter />)
  })

  it('renders empty box components', () => {
    render(<VTDateFilter />)

    expect(Box).toHaveBeenCalledTimes(2)
  })

  it('renders VSpacer components when isMobile is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false
    } as any)
    render(<VTDateFilter />)

    expect(VSpacer).toHaveBeenCalledTimes(0)
  })

  it('renders VSpacer components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)
    render(<VTDateFilter />)

    expect(VSpacer).toHaveBeenCalledTimes(2)
    expect(VSpacer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ size: 'small' }),
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ size: 'small' }),
      {}
    )
  })

  it('renders date filter components with correct props', () => {
    render(<VTDateFilter />)

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
