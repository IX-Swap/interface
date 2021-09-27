import { CommitmentsTableActions } from 'app/pages/accounts/components/Commitments/CommitmentsTableActions'
import * as useConfirmCommitment from 'app/pages/accounts/hooks/useConfirmCommitment'
import React from 'react'
import { render, cleanup, fireEvent } from 'test-utils'
import { commitment } from '__fixtures__/authorizer'
import { generateMutationResult } from '__fixtures__/useQuery'
import { CommitmentInvestForm } from 'app/pages/accounts/components/Commitments/CommitmentInvestForm'

jest.mock(
  'app/pages/accounts/components/Commitments/CommitmentInvestForm',
  () => ({
    CommitmentInvestForm: jest.fn(() => null)
  })
)

describe('CommitmentTableActions', () => {
  const confirm = jest.fn(() => {})
  beforeEach(() => {
    const objResponse = [confirm, generateMutationResult({})]

    jest
      .spyOn(useConfirmCommitment, 'useConfirmCommitment')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CommitmentsTableActions item={commitment} />)
  })

  it('renders with correct initial props', () => {
    render(<CommitmentsTableActions item={commitment} />)
    expect(CommitmentInvestForm).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
      {}
    )
  })

  it('shows dialog box when button is pressed', () => {
    const { container } = render(<CommitmentsTableActions item={commitment} />)
    const button = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(button, { cancelable: true, bubbles: true })

    expect(CommitmentInvestForm).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
      {}
    )
  })
})
