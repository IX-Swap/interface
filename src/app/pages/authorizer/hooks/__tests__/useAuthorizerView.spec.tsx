import React from 'react'
import { render } from 'test-utils'
import {
  renderStatusColumn,
  renderDealStatus
} from 'app/pages/authorizer/hooks/useAuthorizerView'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

jest.mock('app/pages/authorizer/components/AuthorizableStatus', () => ({
  AuthorizableStatus: jest.fn(() => null)
}))

describe('renderStatusColumn', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<>{renderStatusColumn('Test Status')}</>)
  })

  it('renders AuthorizableStatus with correct props', () => {
    render(<>{renderStatusColumn('Test Status')}</>)

    expect(AuthorizableStatus).toHaveBeenCalledTimes(1)
    expect(AuthorizableStatus).toHaveBeenCalledWith(
      { status: 'Test Status', compact: false, isNewTheme: true },
      {}
    )
  })

  it('renders Deal Status without error', () => {
    render(<>{renderDealStatus('Open')}</>)
  })

  it('renders Deal Status AuthorizableStatus with correct props', () => {
    render(<>{renderDealStatus('Open')}</>)

    expect(AuthorizableStatus).toHaveBeenCalledTimes(1)
    expect(AuthorizableStatus).toHaveBeenCalledWith(
      { status: 'Open', compact: false, isNewTheme: true },
      {}
    )
  })
})
