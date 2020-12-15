import React from 'react'
import { render, cleanup } from 'test-utils'
import { useAccountsRouter } from 'app/pages/accounts/router'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'

jest.mock('app/pages/accounts/router')

const useAccountsRouterMock = useAccountsRouter as jest.Mock<
  Partial<ReturnType<typeof useAccountsRouter>>
>

describe('AccountsRoot', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useAccountsRouterMock.mockReturnValueOnce({ renderRoutes })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AccountsRoot />)
  })

  it('renders routes correctly', () => {
    render(<AccountsRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
