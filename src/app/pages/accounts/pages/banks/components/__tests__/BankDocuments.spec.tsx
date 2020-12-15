import React from 'react'
import { render, cleanup } from 'test-utils'
import { BankDocuments } from 'app/pages/accounts/pages/banks/components/BankDocuments'
import { Form } from 'components/form/Form'

describe('BankDocuments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <BankDocuments />
      </Form>
    )
  })
})
