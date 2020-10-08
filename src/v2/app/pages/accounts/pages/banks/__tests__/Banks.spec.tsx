/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks } from 'v2/app/pages/accounts/pages/banks/Banks'
import * as banksRouter from 'v2/app/pages/accounts/pages/banks/router'

describe('Banks', () => {
  const renderRoutes = jest.fn(() => <div />)

  beforeEach(() => {
    jest.spyOn(banksRouter, 'useBanksRouter').mockImplementation(() => ({
      params: {},
      replace: jest.fn(),
      push: jest.fn(),
      query: new URLSearchParams(),
      current: {
        path: '',
        label: ''
      },
      paths: banksRouter.BanksRoute,
      renderRoutes,
      routes: []
    }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Banks />)
  })

  it('renders ', () => {
    render(<Banks />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
