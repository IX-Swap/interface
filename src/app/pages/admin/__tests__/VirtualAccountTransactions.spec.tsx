import React from 'react'
import { render } from 'test-utils'
import { VirtualAccountTransactions } from 'app/pages/admin/pages/VirtualAccountTransactions'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { VirtualTransactionsFilters } from 'app/pages/admin/components/VirtualTransactionsFilters'
import { VirtualTransactionsTable } from 'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable'

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/VirtualTransactionsFilters', () => ({
  VirtualTransactionsFilters: jest.fn(() => null)
}))

jest.mock(
  'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable',
  () => ({
    VirtualTransactionsTable: jest.fn(() => null)
  })
)

describe('VirtualAccountTransactions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders VSpacer components when isMiniLaptop is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: false
    } as any)

    render(<VirtualAccountTransactions />)

    expect(VSpacer).toHaveBeenCalledTimes(1)
    expect(VSpacer).toBeCalledWith(
      expect.objectContaining({
        size: 'medium'
      }),
      {}
    )
  })

  it('renders VSpacer components when isMiniLaptop is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: true
    } as any)

    render(<VirtualAccountTransactions />)

    expect(VSpacer).toHaveBeenCalledTimes(2)
    expect(VSpacer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        size: 'medium'
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
  })

  it('renders PageHeader component with correct props', () => {
    render(<VirtualAccountTransactions />)

    expect(PageHeader).toHaveBeenCalledTimes(1)
    expect(PageHeader).toBeCalledWith(
      expect.objectContaining({
        title: 'Virtual Account Transactions'
      }),
      {}
    )
  })

  it('renders VirtualTransactionsFilters component', () => {
    render(<VirtualAccountTransactions />)

    expect(VirtualTransactionsFilters).toHaveBeenCalledTimes(1)
  })

  it('renders VirtualTransactionsTable component', () => {
    render(<VirtualAccountTransactions />)

    expect(VirtualTransactionsTable).toHaveBeenCalledTimes(1)
  })
})
