import { MemoField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/MemoField'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MemoField', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <MemoField />
      </Form>
    )
  })
})
