import React from 'react'
import { render, cleanup, waitFor, fireEvent } from 'test-utils'
import {
  RejectButton,
  RejectButtonProps
} from 'app/pages/authorizer/components/RejectButton'
import { generateMutationResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { AuthorizerRoute } from 'app/pages/authorizer/router'
import { bank } from '__fixtures__/authorizer'
import { AuthorizerCategory } from 'types/app'
import * as useAuthorizerAction from 'app/pages/authorizer/hooks/useAuthorizerAction'
import { Form } from 'components/form/Form'

describe('RejectButton', () => {
  const props: RejectButtonProps = { itemId: bank._id, disabled: false }

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <RejectButton {...props} />
      </Form>
    )
  })

  it('invokes reject when button is clicked', async () => {
    const reject = jest.fn()
    jest
      .spyOn(useAuthorizerAction, 'useAuthorizerAction')
      .mockReturnValue([reject, generateMutationResult({})])

    const { getByText } = render(
      <Form>
        <RejectButton {...props} />
      </Form>
    )
    const buttonElement = getByText(/Reject/i)
    fireEvent.click(buttonElement)

    await waitFor(() => expect(reject).toHaveBeenCalledTimes(1))
  })
})
