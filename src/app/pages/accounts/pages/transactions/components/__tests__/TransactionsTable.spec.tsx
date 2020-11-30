import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransactionsTable } from 'app/pages/accounts/pages/transactions/components/TransactionsTable'
import { Form } from 'components/form/Form'

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
