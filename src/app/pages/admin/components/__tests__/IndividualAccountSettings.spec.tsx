import React from 'react'
import { render } from 'test-utils'
import { IndividualAccountSettings } from 'app/pages/admin/components/IndividualAccountSettings'
import * as useIndividualAccountSettings from 'app/pages/admin/hooks/useIndividualAccountSettings'
import { TabPanel } from 'app/pages/admin/components/TabPanel'
import { managedUser } from '__fixtures__/user'
import { AccountLoginHistory } from 'app/pages/admin/components/AccountLoginHistory'
import { RoleManagement } from 'app/pages/admin/components/RoleManagement'
import { RevokeAccess } from 'app/pages/admin/components/RevokeAccess'

jest.mock('app/pages/admin/components/AccountLoginHistory', () => ({
  AccountLoginHistory: jest.fn(() => <></>)
}))

jest.mock('app/pages/admin/components/RevokeAccess', () => ({
  RevokeAccess: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/RoleManagement', () => ({
  RoleManagement: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/TabPanel', () => ({
  TabPanel: jest.fn(({ children }) => <div>{children}</div>)
}))

describe('IndividualAccountSettings', () => {
  const handleChange = jest.fn()
  const value = 0
  const roles = managedUser.roles.split(',')

  beforeEach(() => {
    jest
      .spyOn(useIndividualAccountSettings, 'useIndividualAccountSettings')
      .mockImplementation(() => ({ value, handleChange } as any))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IndividualAccountSettings activeRoles={roles} />)
  })

  it('renders components with correct props', () => {
    const { getByText } = render(
      <IndividualAccountSettings activeRoles={roles} />
    )

    expect(getByText(/login history/i)).toBeInTheDocument()
    expect(getByText(/revoke access/i)).toBeInTheDocument()
    expect(getByText(/role management/i)).toBeInTheDocument()

    expect(TabPanel).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ value: 0, index: 0 }),
      {}
    )
    expect(TabPanel).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ value: 0, index: 1 }),
      {}
    )
    expect(TabPanel).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ value: 0, index: 2 }),
      {}
    )

    expect(AccountLoginHistory).toHaveBeenCalled()
    expect(RevokeAccess).toHaveBeenCalled()
    expect(RoleManagement).toHaveBeenCalledWith({ activeRoles: roles }, {})
  })
})
