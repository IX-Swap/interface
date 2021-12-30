import { Funding } from 'app/pages/educationCentre/components/Funding/Funding'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render } from 'test-utils'

describe('Funding', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Funding data={sampleSecurity} />)
  })
})
