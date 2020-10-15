/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, fireEvent, waitFor, cleanup } from 'test-utils'
import { Actions } from 'v2/app/pages/authorizer/components/Actions'
import { bank } from '__fixtures__/authorizer'
import { history } from 'v2/history'
import { AuthorizerRoute } from 'v2/app/pages/authorizer/router'

describe('Actions', () => {
  const props = {
    item: bank,
    cacheQueryKey: [],
    onView: jest.fn()
  }

  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders view button', () => {
    const { getByTestId } = render(<Actions {...props} />)
    const viewButton = getByTestId('view-button')

    expect(viewButton).toBeTruthy()
  })

  it('invokes props.onView function with props.item as an argument', async () => {
    history.push(AuthorizerRoute.banks)

    const { getByTestId } = render(<Actions {...props} />)
    const viewButton = getByTestId('view-button')

    fireEvent.click(viewButton)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/app/authorizer/bank-accounts/1')
      expect(history.location.state).toEqual({
        cacheQueryKey: props.cacheQueryKey,
        itemId: bank._id,
        category: 'bank-accounts'
      })
    })
  })
})
