import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentForm,
  CommitmentFormProps
} from 'app/pages/invest/components/CommitmentForm'
import { dso } from '__fixtures__/authorizer'
import * as useMakeCommitmentHook from 'app/pages/invest/hooks/useMakeCommitment'

describe('CommitmentForm', () => {
  const makeInvestment = jest.fn()
  const props: CommitmentFormProps = {
    dso: dso._id,
    currency: dso.currency.symbol
  }

  beforeEach(() => {
    jest
      .spyOn(useMakeCommitmentHook, 'useMakeCommitment')
      .mockImplementation(() => ({ invest: [makeInvestment] } as any))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentForm {...props} />)
  })
})
