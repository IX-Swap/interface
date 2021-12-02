import React from 'react'
import { cleanup, render } from 'test-utils'
import { DepositFormFields } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields'
import * as snackbar from 'hooks/useSnackbar'
import { asset } from '__fixtures__/authorizer'
import * as balances from 'hooks/balance/useAllBalances'
import { fireEvent, waitFor } from '@testing-library/react'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { balance } from '__fixtures__/balance'
import { generatePath, Route } from 'react-router-dom'

Object.assign(navigator, { clipboard: { writeText: () => {} } })

jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => {})

describe('DepositFormFields', () => {
  const showSnackbar = jest.fn()
  const balanceId = balance.assetId
  const address = '12nfq3r45678900awn2noag3459an'

  beforeEach(() => {
    history.push(generatePath(DSRoute.deposit, { balanceId }))
    jest.spyOn(snackbar, 'useSnackbar').mockReturnValue({ showSnackbar } as any)
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balanceId]: asset } })
      )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    render(
      <Route path={DSRoute.deposit}>
        <DepositFormFields />
      </Route>
    )
  })

  it('invokes showSnackbar on Button click', async () => {
    const { getByRole } = render(
      <Route path={DSRoute.deposit}>
        <DepositFormFields />
      </Route>
    )
    const container = getByRole('button')

    fireEvent.click(container)

    await waitFor(() => {
      expect(showSnackbar).toHaveBeenCalledTimes(1)
    })
  })

  it('copies address to clipboard', async () => {
    const { getByRole } = render(
      <Route path={DSRoute.deposit}>
        <DepositFormFields />
      </Route>
    )
    const container = getByRole('button')

    fireEvent.click(container)

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(address)
    })
  })

  it('displays address', () => {
    const { container } = render(
      <Route path={DSRoute.deposit}>
        <DepositFormFields />
      </Route>
    )

    expect(container).toHaveTextContent(address)
    expect(container).toHaveTextContent(`${asset.symbol} Address`)
  })
})
