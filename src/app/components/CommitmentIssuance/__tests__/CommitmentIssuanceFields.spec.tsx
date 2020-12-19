import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentIssuanceFields,
  CommitmentIssuanceFieldsProps
} from 'app/components/CommitmentIssuance/CommitmentIssuanceFields'
import { Form } from 'components/form/Form'

describe('CommitmentIssuanceFields', () => {
  const props: CommitmentIssuanceFieldsProps = {
    amount: '123 $'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <CommitmentIssuanceFields {...props} />
      </Form>
    )
  })
})
