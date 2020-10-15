/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup, waitFor, fireEvent } from 'test-utils'
import * as useRejectHook from '../../hooks/useReject'
import {
  RejectButton,
  RejectButtonProps
} from 'v2/app/pages/authorizer/components/RejectButton'
import { generateMutationResult } from '__fixtures__/useQuery'
import { history } from 'v2/history'
import { AuthorizerRoute } from 'v2/app/pages/authorizer/router'
import { bank } from '__fixtures__/authorizer'
import { AuthorizerCategory } from 'v2/types/app'

describe('RejectButton', () => {
  const props: RejectButtonProps = { itemId: bank._id }

  beforeEach(() => {
    history.push({
      pathname: AuthorizerRoute.viewItem,
      state: {
        bankId: bank._id,
        category: AuthorizerCategory['Bank Accounts']
      }
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<RejectButton {...props} />)
  })

  it('invokes reject when button is clicked', async () => {
    const reject = jest.fn()
    jest
      .spyOn(useRejectHook, 'useReject')
      .mockReturnValue([reject, generateMutationResult({})])

    const { getByText } = render(<RejectButton {...props} />)
    const buttonElement = getByText(/Reject/i)
    fireEvent.click(buttonElement)

    await waitFor(() => expect(reject).toHaveBeenCalledTimes(1))
  })
})
