import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import * as useOnboardingPanel from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OnboardingDialog', () => {
  const props = {
    title: 'Secure Your Account!',
    message: [
      'Increase your account security by enabling two factor authentication when signing into platform'
    ],
    action: '/app/educationCentre',
    actionLabel: 'Enable 2FA',
    closeLabel: 'Skip',
    closeArrow: false
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = { open: true }

    jest
      .spyOn(useOnboardingPanel, 'useOnboardingPanel')
      .mockImplementation(() => objResponse as any)

    render(<OnboardingDialog {...props} />)
  })
})
