import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { bank } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'

describe('Actions', () => {
  const props = {
    item: bank,
    cacheQueryKey: [],
    onView: jest.fn()
  }

  beforeEach(() => {
    history.push(AuthorizerRoute.banks)
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
})
