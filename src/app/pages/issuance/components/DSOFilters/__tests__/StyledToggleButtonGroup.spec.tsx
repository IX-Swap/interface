import { StyledToggleButtonGroup } from 'app/pages/issuance/components/DSOFilters/StyledToggleButtonGroup'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('StyledToggleButtonGroup', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<StyledToggleButtonGroup />)
  })
})
