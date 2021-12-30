import React from 'react'
import { render } from 'test-utils'
import { TransactionsTable } from 'app/pages/accounts/pages/transactions/components/TransactionsTable'
import { Form } from 'components/form/Form'

describe('TransactionsTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <TransactionsTable />
      </Form>
    )
  })
})
