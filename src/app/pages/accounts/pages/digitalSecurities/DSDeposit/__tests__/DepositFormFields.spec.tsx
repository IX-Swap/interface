import React from 'react'
import { cleanup, render } from 'test-utils'
import { DepositFormFields } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields'
import * as snackbar from 'hooks/useSnackbar'
import { fireEvent, waitFor } from '@testing-library/react'
import { generateQueryResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { generatePath } from 'react-router-dom'
import * as useDepositAddress from 'app/pages/accounts/hooks/useDepositAddress'
import { Form } from 'components/form/Form'
import { fakeDepositAddress } from '__fixtures__/issuance'

Object.assign(navigator, { clipboard: { writeText: () => {} } })

jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => {})

describe('DepositFormFields', () => {
  const showSnackbar = jest.fn()

  beforeEach(() => {
    history.push(generatePath(DSRoute.deposit))
    jest.spyOn(snackbar, 'useSnackbar').mockReturnValue({ showSnackbar } as any)
    jest.spyOn(useDepositAddress, 'useDepositAddress').mockReturnValue(
      generateQueryResult({
        data: fakeDepositAddress,
        isLoading: false
      })
    )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    render(
      <Form>
        <DepositFormFields />
      </Form>
    )
  })

  it('invokes showSnackbar on Button click', async () => {
    const { getByText } = render(
      <Form>
        <DepositFormFields />
      </Form>
    )
    const button = getByText('Copy Address')

    fireEvent.click(button)

    await waitFor(() => {
      expect(showSnackbar).toHaveBeenCalledTimes(1)
    })
  })

  it('copies address to clipboard', async () => {
    const { getByText } = render(
      <Form>
        <DepositFormFields />
      </Form>
    )
    const button = getByText('Copy Address')

    fireEvent.click(button)

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        fakeDepositAddress.deposit_address
      )
    })
  })

  it('displays address', () => {
    const { container } = render(
      <Form>
        <DepositFormFields />
      </Form>
    )

    expect(container).toHaveTextContent(fakeDepositAddress.deposit_address)
  })
})
