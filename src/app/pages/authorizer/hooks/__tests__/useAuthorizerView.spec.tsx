import React from 'react'
import { render, cleanup } from 'test-utils'
import { renderStatusColumn } from 'app/pages/authorizer/hooks/useAuthorizerView'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

jest.mock('app/pages/authorizer/__tests__/AuthorizableStatus', () => ({
  AuthorizableStatus: jest.fn(() => null)
}))

describe('renderStatusColumn', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<>{renderStatusColumn('Test Status')}</>)
  })

  it('renders AuthorizableStatus with correct props', () => {
    render(<>{renderStatusColumn('Test Status')}</>)

    expect(AuthorizableStatus).toHaveBeenCalledTimes(1)
    expect(AuthorizableStatus).toHaveBeenCalledWith(
      { status: 'Test Status' },
      {}
    )
  })
})
