import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentIssuanceForm } from 'v2/app/components/CommitmentIssuance/CommitmentIssuanceForm'

describe('CommitmentIssuanceForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentIssuanceForm />)
  })
})
