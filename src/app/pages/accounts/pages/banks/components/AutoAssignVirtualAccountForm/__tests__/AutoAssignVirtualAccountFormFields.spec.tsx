import React from 'react'
import { render } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/dom'
import { Form } from 'components/form/Form'
import { AutoAssignVirtualAccountFormFields } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountFormFields'
import * as useAuth from 'hooks/auth/useAuth'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { virtualAccount } from '__fixtures__/virtualAccount'
import { user } from '__fixtures__/user'
import { TwoFADialog } from 'app/components/TwoFADialog/TwoFADialog'

jest.mock('app/components/TwoFADialog/TwoFADialog', () => ({
  TwoFADialog: jest.fn(() => null)
}))

describe('AutoAssignVirtualAccountFormFields', () => {
  const handleOpen = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders empty component if virtual account list is loading', () => {
    jest.spyOn(useVirtualAccount, 'useVirtualAccount').mockReturnValue({
      isLoading: true,
      list: [virtualAccount]
    } as any)

    const { container } = render(
      <Form defaultValues={{ currency: 'SGD' }}>
        <AutoAssignVirtualAccountFormFields handleOpen={handleOpen} />
      </Form>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('renders empty component if virtual account list length more than 1', () => {
    jest.spyOn(useVirtualAccount, 'useVirtualAccount').mockReturnValue({
      isLoading: false,
      list: [virtualAccount, virtualAccount]
    } as any)

    const { container } = render(
      <Form defaultValues={{ currency: 'SGD' }}>
        <AutoAssignVirtualAccountFormFields handleOpen={handleOpen} />
      </Form>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('invokes handleOpen function and renders dialog with correct props on button click when enable2Fa is true', async () => {
    const objResponse = {
      user: { ...user, enable2Fa: true }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    jest.spyOn(useVirtualAccount, 'useVirtualAccount').mockReturnValue({
      isLoading: false,
      list: [virtualAccount]
    } as any)

    const { getByTestId } = render(
      <Form defaultValues={{ currency: 'SGD' }}>
        <AutoAssignVirtualAccountFormFields handleOpen={handleOpen} />
      </Form>
    )
    const button = getByTestId('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(handleOpen).toHaveBeenCalled()
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: false,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
    })
  })

  it('not invokes handleOpen function and renders dialog with correct props on button click when enable2Fa is false', async () => {
    const objResponse = {
      user: { ...user, enable2Fa: false }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    jest.spyOn(useVirtualAccount, 'useVirtualAccount').mockReturnValue({
      isLoading: false,
      list: [virtualAccount]
    } as any)

    const { getByTestId } = render(
      <Form defaultValues={{ currency: 'SGD' }}>
        <AutoAssignVirtualAccountFormFields handleOpen={handleOpen} />
      </Form>
    )
    const button = getByTestId('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(handleOpen).toHaveBeenCalledTimes(0)
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: true,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
    })
  })
})
