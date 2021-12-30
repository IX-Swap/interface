import React from 'react'
import * as useAuth from 'hooks/auth/useAuth'
import { render } from 'test-utils'
import { Onboarding2FA } from 'app/components/OnboardingPanel/Onboarding2FA'

describe('Onboarding2FA', () => {
  const objResponse = {
    user: {
      totpConfirmed: false
    }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    render(<Onboarding2FA />)
  })

  it('renders a In Progress based on totpConfirmed is false', () => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { getByText } = render(<Onboarding2FA />)
    expect(getByText('In Progress')).toBeTruthy()
  })

  it('renders a Verified based on totpConfirmed is true', () => {
    objResponse.user.totpConfirmed = true
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { getByText } = render(<Onboarding2FA />)
    expect(getByText('Verified!')).toBeTruthy()
  })
})
