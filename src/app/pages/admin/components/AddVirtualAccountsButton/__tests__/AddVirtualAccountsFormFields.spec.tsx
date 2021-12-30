import { AddVirtualAccountsFormFields } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('AddVirtualAccountsFormFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <AddVirtualAccountsFormFields />
      </Form>
    )
  })
})
