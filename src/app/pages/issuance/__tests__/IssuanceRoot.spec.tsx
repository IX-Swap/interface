import React from 'react'
import { render } from 'test-utils'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'

describe('IssuanceRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<IssuanceRoot />)
  })
})
