import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingAccreditedDialog } from 'app/components/OnboardingPanel/Dialogs/OnboardingAccreditedDialog'
import * as useHasIdentity from 'app/pages/home/hooks/useHasIdentity'
import * as useIsEnabled2FA from 'helpers/acl'
import * as useHomeRouter from 'app/pages/home/router'

describe('OnboardingAccreditedDialog', () => {
  beforeEach(() => {
    const homeResponse = { paths: { createIndividual: '/create/individual' } }
    jest
      .spyOn(useHomeRouter, 'useHomeRouter')
      .mockImplementation(() => homeResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: true }
    const isEnabled = true
    const isAccredited = false

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)

    jest
      .spyOn(useIsEnabled2FA, 'useIsAccredited')
      .mockImplementation(() => isAccredited as any)

    render(<OnboardingAccreditedDialog />)
  })

  it('renders the dialog box when isAccredited is false', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: true }
    const isEnabled = true
    const isAccredited = false

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)

    jest
      .spyOn(useIsEnabled2FA, 'useIsAccredited')
      .mockImplementation(() => isAccredited as any)

    const { getByText } = render(<OnboardingAccreditedDialog />)

    expect(
      getByText(
        'In order to access all features of the platform your identity must be approved. Once your identity has been approved you will recieve email and in-app notifications.'
      )
    ).toBeTruthy()
  })

  it('does not render when there isAccredited is true', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: true }
    const isEnabled = true
    const isAccredited = true

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)

    jest
      .spyOn(useIsEnabled2FA, 'useIsAccredited')
      .mockImplementation(() => isAccredited as any)

    const { container } = render(<OnboardingAccreditedDialog />)

    expect(container).toBeEmptyDOMElement()
  })

  it('does not render when there isEnabled is false', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: true }
    const isEnabled = false
    const isAccredited = false

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)

    jest
      .spyOn(useIsEnabled2FA, 'useIsAccredited')
      .mockImplementation(() => isAccredited as any)

    const { container } = render(<OnboardingAccreditedDialog />)

    expect(container).toBeEmptyDOMElement()
  })

  it('does not render when there hasIdentity is false', () => {
    const hasIdentity = { isLoaded: true, hasIdentity: false }
    const isEnabled = true
    const isAccredited = false

    jest
      .spyOn(useIsEnabled2FA, 'useIsEnabled2FA')
      .mockImplementation(() => isEnabled as any)

    jest
      .spyOn(useHasIdentity, 'useHasIdentity')
      .mockImplementation(() => hasIdentity as any)

    jest
      .spyOn(useIsEnabled2FA, 'useIsAccredited')
      .mockImplementation(() => isAccredited as any)

    const { container } = render(<OnboardingAccreditedDialog />)

    expect(container).toBeEmptyDOMElement()
  })
})
