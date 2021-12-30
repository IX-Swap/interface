import { Recaptcha } from 'auth/pages/login/components/Recaptcha'
import React from 'react'
import { render } from 'test-utils'

describe('Recaptcha', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Recaptcha onVerify={() => {}} />)
  })
})
