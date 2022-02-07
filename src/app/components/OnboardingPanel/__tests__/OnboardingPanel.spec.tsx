import React from 'react'
import { render } from 'test-utils'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { Drawer } from '@mui/material'
import * as useOnboardingSteps from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'

jest.mock('@mui/material/Drawer', () => jest.fn(() => null))

describe('OnboardingPanel', () => {
  const setOpenMock = jest.fn()
  const objResponse = {
    open: true,
    setOpen: setOpenMock
  }

  afterEach(async () => {
    jest.clearAllMocks()
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
