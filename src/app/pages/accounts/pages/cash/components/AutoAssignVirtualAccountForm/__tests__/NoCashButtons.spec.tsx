import * as Button from '@mui/material/Button'
import * as useVirtualAccounts from 'app/pages/accounts/hooks/useVirtualAccount'
import * as useAssignVirtualAccount from 'app/pages/accounts/pages/banks/hooks/useAssignVirtualAccount'
import { AssignConfirmDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/AssignConfirmDialog'
import { NoCashButtons } from 'app/pages/accounts/pages/cash/components/NoCashButtons'
import * as useStyles from 'app/pages/accounts/pages/cash/components/NoCashButtons.styles'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

jest.mock('@mui/material/Button', () => jest.fn(() => null))
jest.mock(
  'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/AssignConfirmDialog',
  () => ({
    AssignConfirmDialog: jest.fn(() => null)
  })
)

describe('NoCashButtons', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Calls button with correct props, calls dialog', () => {
    const useVirtualAccountsResponse = generateQueryResult({
      data: [virtualAccountsSample[0]],
      isLoading: false
    })
    const objResponse = {
      user: { ...user, enable2Fa: true }
    }
    const assignAccount = jest.fn()
    jest
      .spyOn(useVirtualAccounts, 'useVirtualAccounts')
      .mockImplementation(() => useVirtualAccountsResponse as any)
    jest
      .spyOn(useStyles, 'useStyles')
      .mockReturnValueOnce({ button: 'abc' } as any)
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    jest
      .spyOn(useAssignVirtualAccount, 'useAssignVirtualAccount')
      .mockImplementation(() => [assignAccount, { isLoading: false }] as any)
    render(<NoCashButtons />)
    expect(Button).toBeCalledWith(
      expect.objectContaining({
        className: 'abc',
        fullWidth: true,
        children: ['Add ', 'SGD', ' account']
      }),
      {}
    )
    expect(AssignConfirmDialog).toHaveBeenCalledTimes(1)
  })
})
