import React from 'react'
import { render } from 'test-utils'
import { BankDetails } from 'app/components/BankDetails'
import { bank } from '__fixtures__/authorizer'

describe('BankDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<BankDetails bank={bank} />)
  })
})
