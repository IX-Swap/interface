import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import React from 'react'
import { render } from 'test-utils'

describe('ViewButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ViewButton link='/view' />)
  })
})
