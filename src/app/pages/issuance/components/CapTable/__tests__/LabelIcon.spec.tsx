import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'
import React from 'react'
import { render } from 'test-utils'

describe('LabelIcon', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<LabelIcon icon={<div />} />)
  })
})
