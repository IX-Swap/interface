import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import { SecurityDetails } from 'app/pages/educationCentre/components/SecurityDetails/SecurityDetails'
import React from 'react'
import { render } from 'test-utils'

jest.mock('kaktana-react-lightweight-charts', () => jest.fn(() => null))

describe('SecurityDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <SecurityDetails
        security={sampleSecurity}
        comparableSecurities={[sampleSecurity]}
      />
    )
  })
})
