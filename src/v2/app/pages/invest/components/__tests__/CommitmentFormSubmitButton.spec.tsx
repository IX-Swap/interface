/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentFormSubmitButton } from 'v2/app/pages/invest/components/CommitmentFormSubmitButton'
import { Form } from 'v2/components/form/Form'

describe('CommitmentFormSubmitButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <CommitmentFormSubmitButton />
      </Form>
    )
  })
})
