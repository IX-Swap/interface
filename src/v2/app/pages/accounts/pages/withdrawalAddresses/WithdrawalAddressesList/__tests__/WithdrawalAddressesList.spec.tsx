import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddressesList } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesList'
import * as useWithdrawalAddressesRouterHook from 'v2/app/pages/accounts/pages/withdrawalAddresses/router'
import { WithdrawalAddressCreate } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WithdrawalAddressCreate'
import { WithdrawalAddressView } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WithdrawalAddressView'
import { WithdrawalAddressesTable } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/WithdrawalAddressesTable'

jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/WithdrawalAddressesTable',
  () => ({ WithdrawalAddressesTable: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WithdrawalAddressCreate',
  () => ({ WithdrawalAddressCreate: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WithdrawalAddressView',
  () => ({ WithdrawalAddressView: jest.fn(() => null) })
)

describe('WithdrawalAddressesList', () => {
  const paths = useWithdrawalAddressesRouterHook.WithdrawalAddressesRoute
  const current = { path: paths.list }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useWithdrawalAddressesRouterHook, 'useWithdrawalAddressesRouter')
      .mockReturnValueOnce({ paths, current } as any)
    render(<WithdrawalAddressesList />)
  })

  it('renders WithdrawalAddressesTable', () => {
    jest
      .spyOn(useWithdrawalAddressesRouterHook, 'useWithdrawalAddressesRouter')
      .mockReturnValueOnce({ paths, current } as any)
    render(<WithdrawalAddressesList />)

    expect(WithdrawalAddressesTable).toHaveBeenCalled()
  })

  it('opens view modal if navigated to view route', () => {
    current.path = paths.view
    jest
      .spyOn(useWithdrawalAddressesRouterHook, 'useWithdrawalAddressesRouter')
      .mockReturnValueOnce({ paths, current } as any)
    render(<WithdrawalAddressesList />)

    expect(WithdrawalAddressView).toHaveBeenCalledTimes(1)
    expect(WithdrawalAddressView).toHaveBeenCalledWith({ isOpen: true }, {})
    expect(WithdrawalAddressCreate).toHaveBeenCalledTimes(1)
    expect(WithdrawalAddressCreate).toHaveBeenCalledWith({ isOpen: false }, {})
  })
})
