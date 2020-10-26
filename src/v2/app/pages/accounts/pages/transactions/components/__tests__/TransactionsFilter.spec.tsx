/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransactionsFilter } from 'v2/app/pages/accounts/pages/transactions/components/TransactionsFilter'
import { Form } from 'v2/components/form/Form'

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
