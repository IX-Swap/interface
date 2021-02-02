import { SetupScreenshot } from 'app/pages/security/pages/setup2faguide/components/SetupScreenshot'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SetupScreenshot', () => {
  const props = {
    gauthLabel: 'GAuth',
    authyLabel: 'Authy',
    gauthScreenshot: 'gauth.png',
    authyScreenshot: 'authy.png'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SetupScreenshot {...props} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<SetupScreenshot {...props} />)

    expect(getByText('GAuth')).toBeTruthy()
    expect(getByText('Authy')).toBeTruthy()
  })
})
