import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { Drawer } from '@material-ui/core'
import * as useOnboardingSteps from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'

jest.mock('@material-ui/core/Drawer', () => jest.fn(() => null))

describe('OnboardingPanel', () => {
  const setOpenMock = jest.fn()
  const objResponse = {
    open: true,
    setOpen: setOpenMock
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    jest
      .spyOn(useOnboardingSteps, 'useOnboardingSteps')
      .mockImplementation(() => objResponse as any)

    render(<OnboardingPanel />)
  })

  it('renders Drawer correctly', () => {
    jest
      .spyOn(useOnboardingSteps, 'useOnboardingSteps')
      .mockImplementation(() => objResponse as any)

    render(<OnboardingPanel />)
    expect(Drawer).toHaveBeenCalledWith(
      expect.objectContaining({
        open: objResponse.open
      }),
      {}
    )
  })
})
