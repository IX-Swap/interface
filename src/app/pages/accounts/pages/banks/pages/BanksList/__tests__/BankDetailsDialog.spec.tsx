import React from 'react'
import { render, cleanup } from 'test-utils'
import { BankDetailsDialog } from 'app/pages/accounts/pages/banks/pages/BanksList/BankDetailsDialog'
import { bank } from '__fixtures__/authorizer'

describe('BankDetailsDialog', () => {
  const closeFn = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<BankDetailsDialog bank={bank} open close={closeFn} />)
  })
})
