import React from 'react'
import { render } from 'test-utils'
import { TransactionsFilter } from 'app/pages/accounts/pages/transactions/components/TransactionsFilter'
import { Form } from 'components/form/Form'

describe('TransactionsFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <TransactionsFilter />
      </Form>
    )
  })
})
