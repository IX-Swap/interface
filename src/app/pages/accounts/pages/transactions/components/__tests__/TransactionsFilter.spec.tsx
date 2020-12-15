import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransactionsFilter } from 'app/pages/accounts/pages/transactions/components/TransactionsFilter'
import { Form } from 'components/form/Form'

describe('TransactionsFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <TransactionsFilter />
      </Form>
    )
  })
})
