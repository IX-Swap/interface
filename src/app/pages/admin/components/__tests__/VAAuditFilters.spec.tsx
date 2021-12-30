import React from 'react'
import { render } from 'test-utils'
import { VAAuditFilters } from 'app/pages/admin/components/VAAuditFilters'
import { SearchFilter } from 'app/components/SearchFilter'
import Typography from '@material-ui/core/Typography'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock(
  'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter',
  () => ({
    DateFilter: jest.fn(() => null)
  })
)

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

describe('VAAuditFilters', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<VAAuditFilters />)
  })

  it('renders SearchFilter with correct props', () => {
    render(<VAAuditFilters />)
    expect(SearchFilter).toHaveBeenCalledTimes(1)
    expect(SearchFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        fullWidth: true,
        placeholder: 'Search',
        inputAdornmentPosition: 'start'
      }),
      {}
    )
  })

  it('renders Typography with correct props', () => {
    render(<VAAuditFilters />)
    expect(Typography).toHaveBeenCalledTimes(1)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Date:'
      }),
      {}
    )
  })

  it('renders DateFilter components with correct props', () => {
    render(<VAAuditFilters />)
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

  it('renders VSpacer when isDesktop', () => {
    render(<VAAuditFilters />)
    expect(VSpacer).toHaveBeenCalledTimes(0)
  })

  it('renders VSpacer with correct props when isMobile', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: false,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)
    render(<VAAuditFilters />)
    expect(VSpacer).toHaveBeenCalledTimes(3)
    expect(VSpacer).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
  })

  it('renders VSpacer with correct props when isTablet', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: true,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)
    render(<VAAuditFilters />)
    expect(VSpacer).toHaveBeenCalledTimes(1)
    expect(VSpacer).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
  })
})
