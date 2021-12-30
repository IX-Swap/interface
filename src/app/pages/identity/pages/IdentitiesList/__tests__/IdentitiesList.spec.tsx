import * as useGetIdentities from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { IdentitiesList } from 'app/pages/identity/pages/IdentitiesList/IdentitiesList'
import React from 'react'
import { render } from 'test-utils'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { NoIdentityView } from 'app/pages/identity/components/NoIdentityView/NoIdentityView'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

jest.mock(
  'app/pages/identity/components/NoIdentityView/NoIdentityView',
  () => ({
    NoIdentityView: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/IdentityPreview/IdentityPreview',
  () => ({
    IdentityPreview: jest.fn(() => null)
  })
)

describe('IdentitiesList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    const useGetIdentitiesResponse = {
      hasIdentity: true,
      isLoadingIdentities: false
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)

    render(<IdentitiesList />)
  })

  it('renders loading icon when isLoadingIdentities is true', () => {
    const useGetIdentitiesResponse = {
      hasIdentity: true,
      isLoadingIdentities: true
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)

    render(<IdentitiesList />)
    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders NoIdentity Component when hasIdentity is false', () => {
    const useGetIdentitiesResponse = {
      hasIdentity: false,
      isLoadingIdentities: false
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)

    render(<IdentitiesList />)
    expect(NoIdentityView).toHaveBeenCalled()
  })

  it('renders IdentityPreview Component when hasIdentity is false', () => {
    const useGetIdentitiesResponse = {
      hasIdentity: true,
      isLoadingIdentities: false
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => useGetIdentitiesResponse as any)

    render(<IdentitiesList />)
    expect(IdentityPreview).toHaveBeenCalled()
  })
})
