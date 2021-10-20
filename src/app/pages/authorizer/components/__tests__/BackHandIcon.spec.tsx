import React from 'react'
import { render, cleanup } from 'test-utils'
import { BackhandIcon } from 'app/pages/authorizer/components/BackHandIcon'

describe('BackhandIcon', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<BackhandIcon />)
  })
})
