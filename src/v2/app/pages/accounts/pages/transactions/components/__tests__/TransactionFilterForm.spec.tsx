import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransactionFilterForm } from 'v2/app/pages/accounts/pages/transactions/components/TransactionFilterForm'
import { Form } from 'v2/components/form/Form'

describe('TransactionFilterForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <TransactionFilterForm />
      </Form>
    )
  })
})
