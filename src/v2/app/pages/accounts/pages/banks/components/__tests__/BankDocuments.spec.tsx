/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { BankDocuments } from 'v2/app/pages/accounts/pages/banks/components/BankDocuments'
import { Form } from 'v2/components/form/Form'

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
