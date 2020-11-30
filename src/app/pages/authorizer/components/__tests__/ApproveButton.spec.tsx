import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  ApproveButton,
  ApproveButtonProps
} from 'app/pages/authorizer/components/ApproveButton'
import { Form } from 'components/form/Form'
import { generateMutationResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { AuthorizerRoute } from 'app/pages/authorizer/router'
import { bank } from '__fixtures__/authorizer'
import { AuthorizerCategory } from 'types/app'
import * as useAuthorizerAction from 'app/pages/authorizer/hooks/useAuthorizerAction'

describe('ApproveButton', () => {
  const props: ApproveButtonProps = { itemId: bank._id, disabled: false }

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
        <ApproveButton {...props} />
      </Form>
    )
  })

  it('invokes approve when button is clicked', async () => {
    const approve = jest.fn()
    jest
      .spyOn(useAuthorizerAction, 'useAuthorizerAction')
      .mockReturnValue([approve, generateMutationResult({})])

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
