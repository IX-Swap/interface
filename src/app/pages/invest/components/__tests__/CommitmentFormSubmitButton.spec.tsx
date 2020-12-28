import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentFormSubmitButton } from 'app/pages/invest/components/CommitmentFormSubmitButton'
import { Form } from 'components/form/Form'

describe('CommitmentFormSubmitButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <CommitmentFormSubmitButton assetId='123' minInvestment={100} />
      </Form>
    )
  })
})
