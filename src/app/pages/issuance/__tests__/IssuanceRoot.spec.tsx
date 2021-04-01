import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'

describe('IssuanceRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IssuanceRoot />)
  })
})
