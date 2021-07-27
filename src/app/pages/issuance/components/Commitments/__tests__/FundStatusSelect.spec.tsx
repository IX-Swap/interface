import React from 'react'
import { render, cleanup } from 'test-utils'
import { FundStatusSelect } from 'app/pages/issuance/components/Commitments/FundStatusSelect'

describe('FundStatusSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<FundStatusSelect />)
  })
})
