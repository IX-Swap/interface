import React from 'react'
import { render } from 'test-utils'
import { FundStatusSelect } from 'app/pages/issuance/components/Commitments/FundStatusSelect'

describe('FundStatusSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<FundStatusSelect />)
  })
})
