import React from 'react'
import { render } from 'test-utils'
import { CommitmentTableFilter } from 'app/pages/issuance/components/Commitments/CommitmentTableFilters'
import { SearchFilter } from 'app/components/SearchFilter'
import { FundStatusFilter } from 'app/pages/issuance/components/Commitments/FundStatusFilter'
import { VSpacer } from 'components/VSpacer'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import Button from '@material-ui/core/Button'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/Commitments/FundStatusFilter', () => ({
  FundStatusFilter: jest.fn(() => null)
}))

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('@material-ui/core/Button', () => jest.fn(() => null))

describe('CommitmentTableFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders SearchFilter with correct props', () => {
    render(<CommitmentTableFilter />)
    expect(SearchFilter).toHaveBeenCalledTimes(1)
    expect(SearchFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        fullWidth: true,
        placeholder: 'Search Name'
      }),
      {}
    )
  })

  it('renders FundStatusFilter', () => {
    render(<CommitmentTableFilter />)
    expect(FundStatusFilter).toHaveBeenCalledTimes(1)
  })

  it('renders Button with correct props', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: false,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(<CommitmentTableFilter />)
    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'contained',
        color: 'primary',
        style: {
          fontSize: 14,
          fontWeight: 400,
          marginTop: 0
        }
      }),
      {}
    )
  })

  it('renders Button with correct props when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: true,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(<CommitmentTableFilter />)
    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'contained',
        color: 'primary',
        style: {
          fontSize: 14,
          fontWeight: 400,
          marginTop: 16
        }
      }),
      {}
    )
  })

  it('renders VSpacer', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: false,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(<CommitmentTableFilter />)
    expect(VSpacer).toHaveBeenCalledTimes(0)
  })

  it('renders VSpacer with correct props when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: true,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(<CommitmentTableFilter />)
    expect(VSpacer).toHaveBeenCalledTimes(1)
    expect(VSpacer).toHaveBeenCalledWith(
      expect.objectContaining({ size: 'small' }),
      {}
    )
  })
})
