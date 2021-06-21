import { AutoAssignVirtualAccountFormFields } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AutoAssignVirtualAccountFormFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <AutoAssignVirtualAccountFormFields />
      </Form>
    )
  })
})
