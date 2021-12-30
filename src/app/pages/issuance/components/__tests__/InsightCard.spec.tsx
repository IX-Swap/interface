import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import React from 'react'
import { render } from 'test-utils'

describe('InsightCard', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <InsightCard>
        <div />
      </InsightCard>
    )
  })
})
