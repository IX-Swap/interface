import React from 'react'
import { render, cleanup } from 'test-utils'
import { BankDetails } from 'v2/app/components/BankDetails'
import { bank } from '__fixtures__/authorizer'

describe('BankDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BankDetails bank={bank} />)
  })
})
