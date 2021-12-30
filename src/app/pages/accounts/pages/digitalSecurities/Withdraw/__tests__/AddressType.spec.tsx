import { AddressType } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/AddressType'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('AddressType', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <AddressType />
      </Form>
    )
  })
})
