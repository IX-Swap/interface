import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PercentageNumber', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PercentageNumber value={12.23442} />)
  })
})
