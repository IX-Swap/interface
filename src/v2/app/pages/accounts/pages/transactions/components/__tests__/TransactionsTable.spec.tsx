import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransactionsTable } from 'v2/app/pages/accounts/pages/transactions/components/TransactionsTable'
import { Form } from 'v2/components/form/Form'

describe('TransactionsTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <TransactionsTable />
      </Form>
    )
  })
})
