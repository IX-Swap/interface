import React from 'react'
import { render, cleanup } from 'test-utils'
import { VSpacer } from 'components/VSpacer'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { CustodyDatesFilter } from 'app/pages/admin/components/CustodyDatesFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodyDatesFilter />)
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

  it('renders VSpacer components when isMobile is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false
    } as any)
    render(<CustodyDatesFilter />)
    expect(VSpacer).toHaveBeenCalledTimes(0)
  })

  it('renders VSpacer components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)
    render(<CustodyDatesFilter />)
    expect(VSpacer).toHaveBeenCalledTimes(2)
    expect(VSpacer).toHaveBeenNthCalledWith(
      1,
      {
        size: 'small'
      },
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      2,
      {
        size: 'small'
      },
      {}
    )
  })
})
