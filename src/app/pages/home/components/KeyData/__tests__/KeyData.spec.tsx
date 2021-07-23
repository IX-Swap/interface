import { KeyData } from 'app/pages/home/components/KeyData/KeyData'
import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('KeyData', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<KeyData data={sampleSecurity} />)
  })
})
