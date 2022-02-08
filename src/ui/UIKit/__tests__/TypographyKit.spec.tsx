import React from 'react'
import { render, cleanup } from 'test-utils'
import { TypographyKit } from 'ui/UIKit/TypographyKit'

describe('TypographtyKit', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TypographyKit />)
  })
})
