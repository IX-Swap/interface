import { ComparableSecurities } from 'app/pages/home/components/ComparableSecurities/ComparableSecurities'
import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ComparableSecurities', () => {
  const sampleData = [sampleSecurity]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ComparableSecurities data={sampleData} />)
  })
})
