import React from 'react'
import { render } from 'test-utils'
import { BankDetailsDialog } from 'app/pages/accounts/pages/banks/pages/BanksList/BankDetailsDialog'
import { bank } from '__fixtures__/authorizer'

describe('BankDetailsDialog', () => {
  const closeFn = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<BankDetailsDialog bank={bank} open close={closeFn} />)
  })
})
