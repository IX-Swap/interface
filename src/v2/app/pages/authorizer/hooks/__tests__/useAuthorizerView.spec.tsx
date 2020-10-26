/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { renderStatusColumn } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { AuthorizableStatus } from 'v2/app/pages/authorizer/components/AuthorizableStatus'

jest.mock('v2/app/pages/authorizer/components/AuthorizableStatus', () => ({
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
