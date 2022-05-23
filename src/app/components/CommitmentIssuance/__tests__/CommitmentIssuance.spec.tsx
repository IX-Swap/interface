import React from 'react'
import { render } from 'test-utils'
import {
  CommitmentIssuance,
  CommitmentIssuanceProps
} from 'app/components/CommitmentIssuance/CommitmentIssuance'
import { commitment } from '__fixtures__/authorizer'
import { CommitmentIssuanceForm } from 'app/components/CommitmentIssuance/CommitmentIssuanceForm'
import { CommitmentIssuanceFields } from 'app/components/CommitmentIssuance/CommitmentIssuanceFields'

jest.mock('app/components/CommitmentIssuance/CommitmentIssuanceForm', () => ({
  CommitmentIssuanceForm: jest.fn(({ children }) => children)
}))
jest.mock('app/components/CommitmentIssuance/CommitmentIssuanceFields', () => ({
  CommitmentIssuanceFields: jest.fn(() => null)
}))
jest.mock('components/form/Submit', () => ({
  Submit: jest.fn(() => null)
}))

describe('CommitmentIssuance', () => {
  const props: CommitmentIssuanceProps = {
    data: commitment
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders CommitmentIssuanceForm with correct props', () => {
    render(<CommitmentIssuance {...props} />)

    expect(CommitmentIssuanceForm).toHaveBeenCalledTimes(1)
    expect(CommitmentIssuanceForm).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        defaultValues: {
          withdrawalAddress: commitment.withdrawalAddress?.address,
          releaseDate: new Date(commitment.dso.launchDate)
        }
      },
      {}
    )
  })

  it('renders CommitmentIssuanceFields with correct props', () => {
    render(<CommitmentIssuance {...props} />)

    expect(CommitmentIssuanceFields).toHaveBeenCalledTimes(1)
    expect(CommitmentIssuanceFields).toHaveBeenCalledWith(
      {
        amount: `${commitment.numberOfUnits} ${commitment.dso.tokenSymbol}`,
      },
      {}
    )
  })
})
