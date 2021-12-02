import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import { SecurityDetails } from 'app/pages/educationCentre/components/SecurityDetails/SecurityDetails'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('kaktana-react-lightweight-charts', () => jest.fn(() => null))

describe('SecurityDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <SecurityDetails
        security={sampleSecurity}
        comparableSecurities={[sampleSecurity]}
      />
    )
  })
})
