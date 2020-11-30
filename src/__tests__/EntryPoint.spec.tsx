import React from 'react'
import { render, cleanup } from 'test-utils'
import { EntryPoint } from 'EntryPoint'

describe('EntryPoint', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<EntryPoint />)
  })
})
