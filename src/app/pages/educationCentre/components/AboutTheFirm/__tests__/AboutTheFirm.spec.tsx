import { AboutTheFirm } from 'app/pages/educationCentre/components/AboutTheFirm/AboutTheFirm'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AboutTheFirm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AboutTheFirm data={sampleSecurity} />)
  })
})
