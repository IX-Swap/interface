import { ProtocolFilter } from 'app/pages/educationCentre/components/Securities/ProtocolFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ProtocolFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ProtocolFilter />)
  })
})
