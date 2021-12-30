import React from 'react'
import { render } from 'test-utils'
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
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <CommitmentIssuanceFields {...props} />
      </Form>
    )
  })
})
