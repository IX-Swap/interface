import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { history } from 'config/history'
import { Header } from 'app/pages/accounts/pages/banks/pages/BanksList/Header'
import { TwoFADialog } from 'app/components/TwoFADialog/TwoFADialog'
import { user } from '__fixtures__/user'
import * as useAuth from 'hooks/auth/useAuth'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'

jest.mock('app/components/TwoFADialog/TwoFADialog', () => ({
  TwoFADialog: jest.fn(() => null)
}))

describe('Header', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders 2fa dialog with correct props on add bank account button click when enable2Fa is false', async () => {
    const objResponse = {
      user: { ...user, enable2Fa: false }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const { getByTestId } = render(<Header />)

    const button = getByTestId('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: true,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
    })
  })

  it('invokes history push to create bank account route and renders 2fa dialog with correct props on add bank account button click when enable2Fa is true', async () => {
    const objResponse = {
      user: { ...user, enable2Fa: true }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const { getByTestId } = render(<Header />)

    const button = getByTestId('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: false,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
      expect(history.location.pathname).toEqual(BanksRoute.create)
    })
  })
})
