import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodySearchFilter } from 'app/pages/admin/components/CustodySearchFilter'
import { VSpacer } from 'components/VSpacer'
import { SearchFilter } from 'app/components/SearchFilter'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

describe('CustodySearchFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodySearchFilter />)
  })

  it('renders SearchFilter component with correct props', () => {
    render(<CustodySearchFilter />)
    expect(SearchFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        fullWidth: true,
        placeholder: 'Search',
        inputAdornmentPosition: 'start'
      }),
      {}
    )
  })

  it('renders VSpacer components when isMobile and isTablet is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: false
    } as any)
    render(<CustodySearchFilter />)
    expect(VSpacer).toHaveBeenCalledTimes(0)
  })

  it('renders VSpacer components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: false
    } as any)
    render(<CustodySearchFilter />)
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
        size: 'extraSmall'
      },
      {}
    )
  })

  it('renders VSpacer components when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: true
    } as any)
    render(<CustodySearchFilter />)
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
        size: 'extraSmall'
      },
      {}
    )
  })
})
