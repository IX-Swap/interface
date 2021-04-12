import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ViewButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ViewButton link='/view' />)
  })
})
