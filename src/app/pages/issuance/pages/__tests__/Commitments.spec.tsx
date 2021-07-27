import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useDSOsByUserId from 'app/pages/issuance/hooks/useDSOsByUserId'
import { dso } from '__fixtures__/authorizer'
import { Commitments } from 'app/pages/issuance/pages/Commitments'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('Commitments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Commitments />)
  })

  it('renders LoadingIndicator when isLoading is true', () => {
    jest
      .spyOn(useDSOsByUserId, 'useDSOsByUserId')
      .mockReturnValue({ isLoading: true, data: { list: [dso] } } as any)

    render(<Commitments />)

    expect(LoadingIndicator).toHaveBeenCalledTimes(2)
  })
})
