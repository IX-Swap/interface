import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddresses'
import * as useWithdrawalAddressesRouterHook from 'app/pages/accounts/pages/withdrawalAddresses/router'

describe('WithdrawalAddresses', () => {
  const renderRoutes = jest.fn(() => <div />)

  beforeEach(() => {
    jest
      .spyOn(useWithdrawalAddressesRouterHook, 'useWithdrawalAddressesRouter')
      .mockReturnValue({ renderRoutes, replace: jest.fn() } as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddresses />)
  })

  it('renders routes correctly', () => {
    render(<WithdrawalAddresses />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
