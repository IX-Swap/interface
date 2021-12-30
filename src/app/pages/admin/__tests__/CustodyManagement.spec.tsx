import * as React from 'react'
import { render } from 'test-utils'
import { CustodyManagement } from 'app/pages/admin/pages/CustodyManagement/CustodyManagement'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { ViewListedTokens } from 'app/pages/admin/components/ViewListedTokens/ViewListedTokens'

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
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
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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

  it('renders children', () => {
    render(<CustodyManagement />)
    expect(AccountsUnderCustody).toHaveBeenCalledTimes(1)
    expect(CustodyManagementFilters).toHaveBeenCalledTimes(1)
    expect(CustodyManagementTable).toHaveBeenCalledTimes(1)
  })

  it.skip('renders view listed tokens component when custodianValue is hex', () => {
    const custodianValue = 'hex'
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [custodianValue, jest.fn()])

    render(<CustodyManagement />)
    expect(ViewListedTokens).toHaveBeenCalledTimes(1)
    expect(ViewListedTokens).toHaveBeenCalledWith(
      expect.objectContaining({
        radioValue: 'hex'
      }),
      {}
    )
  })

  it.skip('renders view listed tokens component when custodianValue is inestax', async () => {
    const custodianValue = 'investax'
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [custodianValue, jest.fn()])

    render(<CustodyManagement />)
    expect(ViewListedTokens).toHaveBeenCalledWith(
      expect.objectContaining({
        radioValue: 'investax'
      }),
      {}
    )
  })
})
