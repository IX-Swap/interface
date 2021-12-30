import { SecuritiesBarChart } from 'app/pages/educationCentre/components/Charts/SecuritiesBarChart'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import { history } from 'config/history'
import React from 'react'
import { render } from 'test-utils'

describe('SecuritiesBarChart', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    history.push('/?category=Industry')
    render(<SecuritiesBarChart data={[sampleSecurity]} />)
  })
})
