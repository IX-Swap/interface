import React from 'react'
import { render, cleanup } from 'test-utils'
import { Commitments } from 'app/pages/authorizer/pages/commitments/Commitments'
import * as useBulkAuthorizeCommitments from 'app/pages/authorizer/hooks/useBulkAuthorizeCommitment'

jest.mock('app/pages/authorizer/components/AuthorizerList', () => ({
  AuthorizerList: jest.fn(() => null)
}))

describe('Commitments', () => {
  beforeEach(() => {
    const objResponse = [
      jest.fn(() => {}),
      {
        isLoading: false
      }
    ]

    jest
      .spyOn(useBulkAuthorizeCommitments, 'useBulkAuthorizeCommitments')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Commitments />)
  })
})
