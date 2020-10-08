/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewAuthorizableItem } from 'v2/app/pages/authorizer/components/ViewAuthorizableItem'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { history } from 'v2/history'
import { DataroomFeature } from 'v2/types/authorizer'

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

describe('ViewAuthorizableItem', () => {
  beforeEach(() => {
    history.push('/', {
      category: 'withdrawals',
      itemId: 'testItemId',
      cacheQueryKey: 'testCacheQueryKey'
    })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<ViewAuthorizableItem />)
  })

  it('renders AuthorizerView with correct props', () => {
    render(<ViewAuthorizableItem />)

    expect(AuthorizerView).toHaveBeenCalledTimes(1)
    expect(AuthorizerView).toHaveBeenCalledWith(
      {
        title: 'View Item',
        feature: DataroomFeature.withdrawals,
        children: expect.anything()
      },
      {}
    )
  })
})
