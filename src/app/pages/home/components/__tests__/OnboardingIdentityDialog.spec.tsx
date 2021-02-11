import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingIdentityDialog } from 'app/pages/home/components/OnboardingIdentityDialog'
import * as useHasIdentity from 'app/pages/home/hooks/useHasIdentity'
import * as useIdentitiesRouter from 'app/pages/identity/router'
import * as useIsEnabled2FA from 'helpers/acl'

describe('OnboardingIdentityDialog', () => {
  beforeEach(() => {
    const identitiesResponse = {
      paths: { createIndividual: '/create/individual' }
    }
    jest
      .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
      .mockImplementation(() => identitiesResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: false }
    const isEnabled = true

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)

    render(<OnboardingIdentityDialog />)
  })

  it('renders the dialog box when hasIdentiy is false', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: false }
    const isEnabled = true

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)

    const { getByText } = render(<OnboardingIdentityDialog />)

    expect(
      getByText(
        'Please create your identity first before you can manage your Accounts.'
      )
    ).toBeTruthy()
  })

  it('does not render when there hasIdentity is true', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: true }
    const isEnabled = true

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)
    const { container } = render(<OnboardingIdentityDialog />)

    expect(container).toBeEmptyDOMElement()
  })

  it('does not render when there isEnabled is false', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: false }
    const isEnabled = false

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)
    const { container } = render(<OnboardingIdentityDialog />)

    expect(container).toBeEmptyDOMElement()
  })
})
