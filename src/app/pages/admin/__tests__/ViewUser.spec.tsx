import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'
import * as useAdminRouterHook from 'app/pages/admin/router'
import { managedUser } from '__fixtures__/user'
import * as useUserByIdHook from 'app/pages/admin/hooks/useUserById'
import { generateQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { UserDetails } from 'app/pages/admin/components/UserDetails'
import { UserStatus } from 'app/pages/admin/components/UserStatus'

jest.mock('app/pages/admin/components/UserDetails', () => ({
  UserDetails: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/UserStatus', () => ({
  UserStatus: jest.fn(() => null)
}))

describe('ViewUser', () => {
  const params = { userId: managedUser._id }
  const objResponse = generateQueryResult({
    data: managedUser,
    queryStatus: QueryStatus.Success
  })

  beforeEach(() => {
    jest
      .spyOn(useAdminRouterHook, 'useAdminRouter')
      .mockImplementation(() => ({ params } as any))

    jest
      .spyOn(useUserByIdHook, 'useUserById')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ViewUser />)
  })

  it('renders componenst with correct props', () => {
    render(<ViewUser />)

    expect(UserDetails).toHaveBeenCalledWith({ data: managedUser }, {})
    expect(UserStatus).toHaveBeenCalledWith({ data: managedUser }, {})
  })

  it('renders null if data is undefined', () => {
    jest
      .spyOn(useUserByIdHook, 'useUserById')
      .mockImplementation(() => generateQueryResult({ data: undefined }) as any)

    const { container } = render(<ViewUser />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null if isLoading', () => {
    jest
      .spyOn(useUserByIdHook, 'useUserById')
      .mockImplementation(
        () => generateQueryResult({ data: managedUser, isLoading: true }) as any
      )

    const { container } = render(<ViewUser />)
    expect(container).toBeEmptyDOMElement()
  })
})
