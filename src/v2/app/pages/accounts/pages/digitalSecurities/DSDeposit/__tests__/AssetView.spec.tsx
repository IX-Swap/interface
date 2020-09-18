/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AssetView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetView'
import * as snackbar from 'v2/hooks/useSnackbar'
import { asset } from '__fixtures__/authorizer'
import * as balances from 'v2/hooks/balance/useAllBalances'
import { fireEvent, waitFor } from '@testing-library/react'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ balanceId: 'testId' })
}))

Object.assign(navigator, { clipboard: { writeText: () => {} } })

jest
  .spyOn(navigator.clipboard, 'writeText')
  .mockImplementation(async () => null)

describe('AssetView', () => {
  const showSnackbar = jest.fn()
  const balanceId = 'testId'
  const address = '12nfq3r45678900awn2noag3459an'

  beforeEach(() => {
    jest
      .spyOn(snackbar, 'useSnackbar')
      .mockImplementation(() => ({ showSnackbar }))
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue({ data: { map: { [balanceId]: asset } } })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    render(<AssetView />)
  })

  it('invokes showSnackbar on Button click', async () => {
    const { getByRole } = render(<AssetView />)
    const container = getByRole('button')

    fireEvent.click(container)

    await waitFor(() => {
      expect(showSnackbar).toHaveBeenCalledTimes(1)
    })
  })

  it('copies address to clipboard', async () => {
    const { getByRole } = render(<AssetView />)
    const container = getByRole('button')

    fireEvent.click(container)

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(address)
    })
  })

  it('displays address', () => {
    const { container } = render(<AssetView />)

    expect(container).toHaveTextContent(address)
    expect(container).toHaveTextContent(`${asset.symbol} Address`)
  })
})
