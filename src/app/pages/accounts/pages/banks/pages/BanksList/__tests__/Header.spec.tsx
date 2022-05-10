import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { history } from 'config/history'
import { Header } from 'app/pages/accounts/pages/banks/pages/BanksList/Header'
import { user } from '__fixtures__/user'
import * as useAuth from 'hooks/auth/useAuth'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'

describe('Header', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes location pathname change on button click when enable2Fa is true', async () => {
    const objResponse = {
      user: { ...user, enable2Fa: true }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const { getByTestId } = render(<Header />)

    const button = getByTestId('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(history.location.pathname).toEqual(BanksRoute.create)
    })
  })
})
