import * as useGetIdentities from 'app/hooks/onboarding/useGetIdentities'
import * as useVirtualAccountById from 'app/pages/authorizer/hooks/useVirtualAccountById'
import { VirtualAccountAuthorization } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccountAuthorization'
import React from 'react'
import { render } from 'test-utils'
import { corporate, individual } from '__fixtures__/identity'
import { virtualAccount } from '__fixtures__/virtualAccount'
import { generateQueryResult } from '__fixtures__/useQuery'

jest.mock('app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

describe('VirtualAccountAuthorization', () => {
  beforeEach(() => {
    const useVirtualAccountByIdResponse = generateQueryResult({
      data: virtualAccount,
      isLoading: false
    })
    jest
      .spyOn(useVirtualAccountById, 'useVirtualAccountById')
      .mockImplementation(() => useVirtualAccountByIdResponse as any)

    const useGetIdentitiesResponse = {
      hasIdentity: true,
      individualIdentity: individual,
      corporateIdentities: { list: [corporate] },
      isLoadingIdentities: false
    }
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', async () => {
    render(<VirtualAccountAuthorization />)
  })

  it('returns null when isLoading', () => {
    const useVirtualAccountByIdResponse = generateQueryResult({
      data: virtualAccount,
      isLoading: true
    })
    jest
      .spyOn(useVirtualAccountById, 'useVirtualAccountById')
      .mockImplementation(() => useVirtualAccountByIdResponse as any)

    const useGetIdentitiesResponse = {
      hasIdentity: true,
      individualIdentity: individual,
      corporateIdentities: { list: [corporate] },
      isLoadingIdentities: false
    }
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)

    const { container } = render(<VirtualAccountAuthorization />)
    expect(container).toBeEmptyDOMElement()
  })

  it('returns null when isLoadingIdentities', () => {
    const useVirtualAccountByIdResponse = generateQueryResult({
      data: virtualAccount,
      isLoading: false
    })
    jest
      .spyOn(useVirtualAccountById, 'useVirtualAccountById')
      .mockImplementation(() => useVirtualAccountByIdResponse as any)

    const useGetIdentitiesResponse = {
      hasIdentity: true,
      individualIdentity: individual,
      corporateIdentities: { list: [corporate] },
      isLoadingIdentities: true
    }
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)

    const { container } = render(<VirtualAccountAuthorization />)
    expect(container).toBeEmptyDOMElement()
  })

  it('returns null when virtualAccount is undefined', () => {
    const useVirtualAccountByIdResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })
    jest
      .spyOn(useVirtualAccountById, 'useVirtualAccountById')
      .mockImplementation(() => useVirtualAccountByIdResponse as any)

    const useGetIdentitiesResponse = {
      hasIdentity: true,
      individualIdentity: individual,
      corporateIdentities: { list: [corporate] },
      isLoadingIdentities: false
    }
    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)

    const { container } = render(<VirtualAccountAuthorization />)
    expect(container).toBeEmptyDOMElement()
  })
})
