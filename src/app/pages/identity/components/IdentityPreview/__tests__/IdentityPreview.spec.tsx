import * as useGetIdentities from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate, individual } from '__fixtures__/identity'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { CorporateIdentityButton } from 'app/pages/identity/components/IdentityPreview/CorporateIdentityButton'
import { IndividualIdentityButton } from 'app/pages/identity/components/IdentityPreview/IndividualIdentityButton'
import { IssuerIdentityButton } from 'app/pages/identity/components/IdentityPreview/IssuerIdentityButton'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

jest.mock(
  'app/pages/identity/components/IdentityPreview/CorporateIdentityButton',
  () => ({
    CorporateIdentityButton: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/IdentityPreview/IssuerIdentityButton',
  () => ({
    IssuerIdentityButton: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/IdentityPreview/IndividualIdentityButton',
  () => ({
    IndividualIdentityButton: jest.fn(() => null)
  })
)

describe('IdentityPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = {
      hasIdentity: true,
      isLoadingIdentities: false,
      individualIdentity: individual,
      corporateIdentities: { list: [corporate] }
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => objResponse as any)

    render(<IdentityPreview />)
  })

  it('renders loading indicator when isLoadingIdentities is true', () => {
    const objResponse = {
      hasIdentity: true,
      isLoadingIdentities: true,
      individualIdentity: individual,
      corporateIdentities: { list: [corporate] }
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => objResponse as any)

    render(<IdentityPreview />)

    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders null when hasIdentity is false', () => {
    const objResponse = {
      hasIdentity: false,
      isLoadingIdentities: true,
      individualIdentity: individual,
      corporateIdentities: { list: [corporate] }
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<IdentityPreview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders CorporateIdentityButton when corporateIdentities is not undefined', () => {
    const objResponse = {
      hasIdentity: true,
      isLoadingIdentities: false,
      individualIdentity: undefined,
      corporateIdentities: { list: [corporate] }
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => objResponse as any)

    render(<IdentityPreview />)

    expect(CorporateIdentityButton).toHaveBeenCalled()
  })

  it('renders IssuerIdentityButton when corporateIdentities is not undefined and is type issuer', () => {
    const objResponse = {
      hasIdentity: true,
      isLoadingIdentities: false,
      individualIdentity: undefined,
      corporateIdentities: { list: [{ ...corporate, type: 'issuer' }] }
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => objResponse as any)

    render(<IdentityPreview />)

    expect(IssuerIdentityButton).toHaveBeenCalled()
  })

  it('renders IndividualIdentityButton when individualIdentity is not undefined', () => {
    const objResponse = {
      hasIdentity: true,
      isLoadingIdentities: false,
      individualIdentity: individual,
      corporateIdentities: undefined
    }

    jest
      .spyOn(useGetIdentities, 'useGetIdentities')
      .mockImplementation(() => objResponse as any)

    render(<IdentityPreview />)

    expect(IndividualIdentityButton).toHaveBeenCalled()
  })
})
