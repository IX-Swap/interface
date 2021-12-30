import { MemoField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/MemoField'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('MemoField', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <MemoField />
      </Form>
    )
  })
})
