import { AddressType } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/AddressType'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AddressType', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <AddressType />
      </Form>
    )
  })
})
