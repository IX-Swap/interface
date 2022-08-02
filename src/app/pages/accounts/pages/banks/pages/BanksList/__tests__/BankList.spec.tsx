import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { BanksList } from 'app/pages/accounts/pages/banks/pages/BanksList/BanksList'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))
jest.mock('app/pages/accounts/pages/banks/pages/BanksList/Table', () => ({
  Table: jest.fn(() => null)
}))
jest.mock('@mui/material/Grid', () => jest.fn(({ children }) => children))

describe('BanksList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('shows mobile header on mobile', async () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)
    render(<BanksList />)
    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Bank accounts',
        showBreadcrumbs: false,
        styled: false,
        variant: 'h3'
      }),
      {}
    )
  })

  it('shows desktop header on desktop', async () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: false
    } as any)
    render(<BanksList />)
    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-testid': 'desktop-header',
        title: 'Bank Accounts'
      }),
      {}
    )
  })
})
