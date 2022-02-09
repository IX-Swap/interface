import React from 'react'
import { render, cleanup } from 'test-utils'
import { ColorKit } from 'ui/UIKit/ColorKit'

describe('ColorKit', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ColorKit />)
  })
})
