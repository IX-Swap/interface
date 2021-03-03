import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import { OnboardingDialogStateProvider } from 'app/components/OnboardingDialog/useOnboardingDialogState'
import * as useOnboardingPanel from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OnboardingDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = { open: true }

    jest
      .spyOn(useOnboardingPanel, 'useOnboardingPanel')
      .mockImplementation(() => objResponse as any)

    render(
      <OnboardingDialogStateProvider>
        <OnboardingDialog />
      </OnboardingDialogStateProvider>
    )
  })
})
