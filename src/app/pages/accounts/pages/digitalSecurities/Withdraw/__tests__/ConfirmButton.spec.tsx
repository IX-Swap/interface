import { ConfirmButton } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/ConfirmButton'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('ConfirmButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <ConfirmButton disabled={false} isSuccess={false} />
      </Form>
    )
  })
})
