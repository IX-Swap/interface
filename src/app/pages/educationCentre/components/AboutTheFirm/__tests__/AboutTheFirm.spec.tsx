import { AboutTheFirm } from 'app/pages/educationCentre/components/AboutTheFirm/AboutTheFirm'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render } from 'test-utils'

describe('AboutTheFirm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AboutTheFirm data={sampleSecurity} />)
  })
})
