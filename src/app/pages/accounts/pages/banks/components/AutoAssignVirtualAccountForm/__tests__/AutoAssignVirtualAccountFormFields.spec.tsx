import { AutoAssignVirtualAccountFormFields } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('AutoAssignVirtualAccountFormFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <AutoAssignVirtualAccountFormFields />
      </Form>
    )
  })
})
