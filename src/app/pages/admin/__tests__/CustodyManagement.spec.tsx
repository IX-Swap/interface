import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodyManagement } from 'app/pages/admin/pages/CustodyManagement'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { ListedTokensDialog } from 'app/pages/admin/components/ListedTokensDialog/ListedTokensDialog'
import { ViewListedTokens } from 'app/pages/admin/components/ViewListedTokens/ViewListedTokens'

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/AccountsUnderCustody', () => ({
  AccountsUnderCustody: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/CustodyManagementFilters', () => ({
  CustodyManagementFilters: jest.fn(() => null)
}))

jest.mock(
  'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable',
  () => ({
    CustodyManagementTable: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/admin/components/ListedTokensDialog/ListedTokensDialog',
  () => ({
    ListedTokensDialog: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/admin/components/ViewListedTokens/ViewListedTokens',
  () => ({
    ViewListedTokens: jest.fn(() => null)
  })
)

describe('CustodyManagement', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CustodyManagement />)
  })

  it('renders page header component with correct props', () => {
    render(<CustodyManagement />)
    expect(PageHeader).toHaveBeenCalledWith(
      {
        title: 'Custody Management'
      },
      {}
    )
  })

  it('renders VSpacer components with correct props', () => {
    render(<CustodyManagement />)
    expect(VSpacer).toHaveBeenCalledTimes(3)
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
        size: 'medium'
      },
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      3,
      {
        size: 'medium'
      },
      {}
    )
  })

  it('renders diagram component', () => {
    render(<CustodyManagement />)
    expect(AccountsUnderCustody).toHaveBeenCalledTimes(1)
  })

  it('renders filters component', () => {
    render(<CustodyManagement />)
    expect(CustodyManagementFilters).toHaveBeenCalledTimes(1)
  })

  it('renders table component', () => {
    render(<CustodyManagement />)
    expect(CustodyManagementTable).toHaveBeenCalledTimes(1)
  })

  it('renders view listed tokens component', () => {
    render(<CustodyManagement />)
    expect(ListedTokensDialog).toHaveBeenCalledTimes(1)
    expect(ListedTokensDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
        currentCustodian: 'HEX'
      }),
      {}
    )
  })

  it('renders view listed tokens component', () => {
    render(<CustodyManagement />)
    expect(ViewListedTokens).toHaveBeenCalledTimes(1)
    expect(ViewListedTokens).toHaveBeenCalledWith(
      expect.objectContaining({
        radioValue: 'hex'
      }),
      {}
    )
  })
})
