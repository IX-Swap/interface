import { OnboardingHome } from 'app/components/OnboardingPanel/OnboardingHome'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render } from 'test-utils'

describe('OnboardingHome', () => {
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
    render(<OnboardingHome />)
  })

  it('renders a link based on totpConfirmed is false', () => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { getByText } = render(<OnboardingHome />)
    expect(getByText('Enable 2FA')).toBeTruthy()
  })

  it('renders a Verified based on totpConfirmed is true', () => {
    objResponse.user.totpConfirmed = true
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { getByText } = render(<OnboardingHome />)
    expect(getByText('Verified!')).toBeTruthy()
  })
})
