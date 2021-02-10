import { Onboarding2FADialog } from 'app/pages/home/components/Onboarding2FADialog'
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
    render(<Onboarding2FADialog initOpened={true} />)
  })

  it('renders when initOpened is true', () => {
    const { getByText } = render(<Onboarding2FADialog initOpened={true} />)

    expect(
      getByText(
        'Increase your account security by enabling two factor authentication when signing into platform'
      )
    ).toBeTruthy()
  })

  it('does not render when initOpened is false', () => {
    const { container } = render(<Onboarding2FADialog initOpened={false} />)

    expect(container).toBeEmptyDOMElement()
  })
})
