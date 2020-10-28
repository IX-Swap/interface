/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { useAccountsRouter } from 'v2/app/pages/accounts/router'
import { AccountsRoot } from 'v2/app/pages/accounts/AccountsRoot'

jest.mock('v2/app/pages/accounts/router')

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
