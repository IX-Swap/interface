/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import {
  fireEvent,
  waitFor,
  renderWithAuthorizerTableStore,
  cleanup
} from 'test-utils'
import {
  Actions,
  getItemOwnerId
} from 'v2/app/pages/authorizer/components/Actions'
import { bank } from '__fixtures__/authorizer'
import { history } from 'v2/history'
import { AuthorizerRoute } from 'v2/app/pages/authorizer/router'
import { user } from '__fixtures__/user'

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
    const { getByTestId } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )
    const viewButton = getByTestId('view-button')

    expect(viewButton).toBeTruthy()
  })

  it('invokes props.onView function with props.item as an argument', async () => {
    history.push(AuthorizerRoute.banks)

    const { getByTestId } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )
    const viewButton = getByTestId('view-button')

    fireEvent.click(viewButton)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/app/authorizer/banks/1')
      expect(history.location.state).toEqual({
        cacheQueryKey: props.cacheQueryKey,
        itemId: bank._id,
        category: 'banks',
        ownerId: bank.user._id
      })
    })
  })
})

describe('getItemOwnerId', () => {
  it('returns user if provided value is string', () => {
    expect(getItemOwnerId('user')).toBe('user')
  })

  it('returns user id if provided value is an object', () => {
    expect(getItemOwnerId(user)).toBe(user._id)
  })
})
