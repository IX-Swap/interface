/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewAuthorizableItem } from 'v2/app/pages/authorizer/components/ViewAuthorizableItem'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { history } from 'v2/history'
import { DataroomFeature } from 'v2/types/authorizer'
import * as useAuthorizerDataHook from 'v2/app/pages/authorizer/hooks/useAuthorizerData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { AuthorizerCategory } from 'v2/types/app'
import { bank } from '__fixtures__/authorizer'

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => <div />)
}))

describe('ViewAuthorizableItem', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthorizerDataHook, 'useAuthorizerData')
      .mockImplementation(() => ({
        ...generateInfiniteQueryResult({}),
        data: bank,
        category: AuthorizerCategory.BankAccounts
      }))
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

    expect(AuthorizerView).toHaveBeenCalledWith(
      {
        title: 'Bank Account',
        feature: DataroomFeature['bank-accounts'],
        data: bank,
        children: expect.any(Object)
      },
      {}
    )
  })
})
