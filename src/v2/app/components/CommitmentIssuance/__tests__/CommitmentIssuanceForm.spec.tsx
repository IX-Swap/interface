import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentIssuanceForm } from 'v2/app/components/CommitmentIssuance/CommitmentIssuanceForm'
import * as useCommitmentIssuanceHook from 'v2/app/pages/authorizer/hooks/useCommitmentIssuance'

describe('CommitmentIssuanceForm', () => {
  const updateIssuance = jest.fn()
  beforeEach(() => {
    jest
      .spyOn(useCommitmentIssuanceHook, 'useCommitmentIssuance')
      .mockImplementation(() => [updateIssuance] as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentIssuanceForm />)
  })
})
