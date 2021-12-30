import React from 'react'
import { render } from 'test-utils'
import { Step4Enable } from 'app/pages/security/pages/setup2fa/components/Step4Enable'

describe('Step4Enable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Step4Enable />)
  })
})
