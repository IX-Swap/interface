import React from 'react'
import { render, BaseProviders } from 'test-utils'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import * as useTableWithPaginationHook from 'components/TableWithPagination/hooks/useTableWithPagination'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { dso } from '__fixtures__/authorizer'
import { Commitments } from 'app/pages/issuance/pages/Commitments'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { PageHeader } from 'app/pages/issuance/components/Commitments/PageHeader'
import { QueryStatus } from 'react-query'
import { DSOFilter } from 'app/pages/issuance/components/Commitments/DSOFilter'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { CountdownTimer } from 'app/pages/issuance/components/CountdownTimer/CountdownTimer'
import { InvestorCommitmentTable } from 'app/pages/issuance/components/Commitments/InvestorCommitmentTable'
import { CloseDealDialog } from 'app/pages/issuance/components/Commitments/CloseDealDialog/CloseDealDialog'
import Button from '@mui/material/Button'
import { VSpacer } from 'components/VSpacer'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'

const useTableWithPaginationMockReturnValue: useTableWithPaginationHook.UseTableWithPaginationReturnType<any> =
  {
    total: 4,
    items: [],
    setRowsPerPage: jest.fn(),
    setPage: jest.fn(),
    status: QueryStatus.Idle,
    fetchMore: jest.fn(),
    page: 0,
    rowsPerPage: 4,
    isLoading: false
  }

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/Commitments/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/Commitments/DSOFilter', () => ({
  DSOFilter: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/CapTable/AmountRaised', () => ({
  AmountRaised: jest.fn(() => null)
}))

jest.mock(
  'app/pages/issuance/components/IssuanceLanding/TargetFundraise',
  () => ({
    TargetFundraise: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/CountdownTimer/CountdownTimer',
  () => ({
    CountdownTimer: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/Commitments/InvestorCommitmentTable',
  () => ({
    InvestorCommitmentTable: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/Commitments/CloseDealDialog/CloseDealDialog',
  () => ({
    CloseDealDialog: jest.fn(() => null)
  })
)

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('@mui/material/Button', () => jest.fn(() => null))

describe('Commitments', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders LoadingIndicator when isLoading is true', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)

    render(<Commitments />)

    expect(LoadingIndicator).toHaveBeenCalledTimes(1)
  })

  it('renders PageHeader with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)

    expect(PageHeader).toHaveBeenCalledTimes(1)
    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        title: dso.tokenName
      }),
      {}
    )
  })

  it('renders DSOFilter', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)

    expect(DSOFilter).toHaveBeenCalledTimes(1)
  })

  it('renders AmountRaised', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)

    expect(AmountRaised).toHaveBeenCalledTimes(1)
  })

  it('renders TargetFundraise with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)

    expect(TargetFundraise).toHaveBeenCalledTimes(1)
    expect(TargetFundraise).toHaveBeenCalledWith(
      expect.objectContaining({ isNewThemeOn: true }),
      {}
    )
  })

  it('renders CountdownTimer with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)

    expect(CountdownTimer).toHaveBeenCalledTimes(1)
    expect(CountdownTimer).toHaveBeenCalledWith(
      expect.objectContaining({ isNewThemeOn: true, my: 0, mx: 0 }),
      {}
    )
  })

  it('renders InvestorCommitmentTable', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)

    expect(InvestorCommitmentTable).toHaveBeenCalledTimes(1)
  })

  it('renders CloseDealDialog with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)

    expect(CloseDealDialog).toHaveBeenCalledTimes(1)
    expect(CloseDealDialog).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
      {}
    )
  })

  it('renders VSpacer when isDesktop is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: false,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(
      <BaseProviders>
        <Commitments />
      </BaseProviders>
    )

    expect(VSpacer).toHaveBeenCalledTimes(1)
    expect(VSpacer).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 'extraMedium'
      }),
      {}
    )
  })

  it('renders VSpacer when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: false,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(
      <BaseProviders>
        <Commitments />
      </BaseProviders>
    )

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
        size: 'extraMedium'
      }),
      {}
    )
  })

  it('renders VSpacer when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: true,
      isMiniLaptop: false,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(
      <BaseProviders>
        <Commitments />
      </BaseProviders>
    )

    expect(VSpacer).toHaveBeenCalledTimes(3)
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
        size: 'small'
      }),
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        size: 'extraMedium'
      }),
      {}
    )
  })

  it('renders VSpacer when isMiniLaptop is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: true,
      isMiniLaptop: true,
      theme: { spacing: jest.fn(), palette: { backgrounds: { default: '' } } }
    } as any)

    render(
      <BaseProviders>
        <Commitments />
      </BaseProviders>
    )

    expect(VSpacer).toHaveBeenCalledTimes(4)
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
        size: 'small'
      }),
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )

    expect(VSpacer).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        size: 'extraMedium'
      }),
      {}
    )
  })

  it('renders CloseDeal button with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)
    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'outlined',
        color: 'primary',
        disabled: true,
        children: 'Close deal'
      }),
      {}
    )
  })

  it('renders closed button with correct props', () => {
    const closedDealDSO = { ...dso, dealStatus: 'Closed' }
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: closedDealDSO } as any)

    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<Commitments />)
    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'outlined',
        color: 'primary',
        disabled: true,
        children: 'Closed'
      }),
      {}
    )
  })
})
