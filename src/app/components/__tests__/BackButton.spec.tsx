import React from 'react'
import { render, cleanup } from 'test-utils'
import { BackButton } from 'app/components/BackButton'

describe('BackButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BackButton />)
  })
})
