import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('LabelIcon', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<LabelIcon icon={<div />} />)
  })
})
