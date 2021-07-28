import { Recaptcha } from 'auth/pages/login/components/Recaptcha'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Recaptcha', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Recaptcha onVerify={() => {}} />)
  })
})
