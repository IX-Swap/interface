import React from 'react'
import { render } from 'test-utils'
import { TransactionFilterForm } from 'app/pages/accounts/pages/transactions/components/TransactionFilterForm'
import { Form } from 'components/form/Form'

describe('TransactionFilterForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <TransactionFilterForm />
      </Form>
    )
  })
})
