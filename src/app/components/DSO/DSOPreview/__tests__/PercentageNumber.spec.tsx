import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'
import React from 'react'
import { render } from 'test-utils'

describe('PercentageNumber', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PercentageNumber value={12.23442} />)
  })
})
