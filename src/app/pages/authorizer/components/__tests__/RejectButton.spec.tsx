import React from 'react'
import { render, waitFor, fireEvent } from 'test-utils'
import {
  RejectButton,
  RejectButtonProps
} from 'app/pages/authorizer/components/RejectButton'
import { history } from 'config/history'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { bank } from '__fixtures__/authorizer'
import { AuthorizerCategory } from 'types/app'
import { Form } from 'components/form/Form'

describe('RejectButton', () => {
  const props: RejectButtonProps = { reject: jest.fn(), disabled: false }

  beforeEach(() => {
    history.push({
      pathname: AuthorizerRoute.viewItem,
      state: {
        bankId: bank._id,
        category: AuthorizerCategory.BankAccounts
      }
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes reject when button is clicked', async () => {
    const { getByText } = render(
      <Form>
        <RejectButton {...props} />
      </Form>
    )
    const buttonElement = getByText(/Reject/i)
    fireEvent.click(buttonElement)

    await waitFor(() => expect(props.reject).toHaveBeenCalledTimes(1))
  })
})
