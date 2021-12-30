import { ComparableSecurities } from 'app/pages/educationCentre/components/ComparableSecurities/ComparableSecurities'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render } from 'test-utils'

describe('ComparableSecurities', () => {
  const sampleData = [sampleSecurity]

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ComparableSecurities data={sampleData} />)
  })
})
