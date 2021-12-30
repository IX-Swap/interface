import { SetupScreenshot } from 'app/pages/security/pages/setup2faguide/components/SetupScreenshot'
import React from 'react'
import { render } from 'test-utils'

describe('SetupScreenshot', () => {
  const props = {
    gauthLabel: 'GAuth',
    authyLabel: 'Authy',
    gauthScreenshot: 'gauth.png',
    authyScreenshot: 'authy.png'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SetupScreenshot {...props} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<SetupScreenshot {...props} />)

    expect(getByText('GAuth')).toBeTruthy()
    expect(getByText('Authy')).toBeTruthy()
  })
})
