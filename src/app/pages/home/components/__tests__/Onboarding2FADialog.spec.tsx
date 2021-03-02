import { Onboarding2FADialog } from 'app/components/OnboardingPanel/Dialogs/Onboarding2FADialog'
import * as useSecurityRouter from 'app/pages/security/router'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Onboarding2FADialog', () => {
  beforeEach(() => {
    const securityRouter = { paths: { setup2fa: '/setup/2fa' } }

    jest
      .spyOn(useSecurityRouter, 'useSecurityRouter')
      .mockImplementation(() => securityRouter as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Onboarding2FADialog />)
  })
})
