import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('InsightCard', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <InsightCard>
        <div />
      </InsightCard>
    )
  })
})
