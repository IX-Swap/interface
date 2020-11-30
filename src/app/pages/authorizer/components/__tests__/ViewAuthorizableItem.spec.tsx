import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewAuthorizableItem } from 'app/pages/authorizer/components/ViewAuthorizableItem'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { history } from 'config/history'
import { DataroomFeature } from 'types/authorizer'
import * as useAuthorizerDataHook from 'app/pages/authorizer/hooks/useAuthorizerData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { AuthorizerCategory } from 'types/app'
import { bank } from '__fixtures__/authorizer'

jest.mock('app/pages/authorizer/components/AuthorizerView', () => ({
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
