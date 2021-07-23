import { SecuritiesBarChart } from 'app/pages/home/components/Charts/SecuritiesBarChart'
import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import { history } from 'config/history'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SecuritiesBarChart', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    history.push('/?category=Industry')
    render(<SecuritiesBarChart data={[sampleSecurity]} />)
  })
})
