import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render } from 'test-utils'
import {
  ApproveButton,
  ApproveButtonProps
} from 'app/pages/authorizer/components/ApproveButton'
import { Form } from 'components/form/Form'
import { history } from 'config/history'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { bank } from '__fixtures__/authorizer'
import { AuthorizerCategory } from 'types/app'

describe('ApproveButton', () => {
  const approve = jest.fn()
  const props: ApproveButtonProps = { approve, disabled: false }

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

  it('invokes approve when button is clicked', async () => {
    const { getByText } = render(
      <Form defaultValues={{ comment: '', sharedWithUser: false }}>
        <ApproveButton {...props} />
      </Form>
    )
    const approveButton = getByText(/approve/i)

    fireEvent.click(approveButton)
    await waitFor(() => {
      expect(approve).toHaveBeenCalledTimes(1)
    })
  })
})
