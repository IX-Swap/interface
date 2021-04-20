import { AddVirtualAccountsFormFields } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AddVirtualAccountsFormFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <AddVirtualAccountsFormFields />
      </Form>
    )
  })
})
