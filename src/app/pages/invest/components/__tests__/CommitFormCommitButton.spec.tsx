import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import { CommitmentFormCommitButton } from 'app/pages/invest/components/CommitFormCommitButton'

describe('CommitmentFormCommitButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <CommitmentFormCommitButton
          assetId='123'
          minInvestment={100}
          dsoId='123'
          currency='$'
        />
      </Form>
    )
  })
})
