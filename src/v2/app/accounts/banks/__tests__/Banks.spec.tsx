/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks } from '../Banks'
import * as banksRouter from 'v2/app/accounts/banks/router'

describe('Banks', () => {
  const renderRoutes = jest.fn()

  beforeEach(() => {
    jest.spyOn(banksRouter, 'useBanksRouter').mockImplementation(() => ({
      push: jest.fn(),
      query: new URLSearchParams(),
      current: {
        path: '',
        label: ''
      },
      routes: banksRouter.BanksRoute,
      renderRoutes
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

    expect(renderRoutes).toHaveBeenCalledTimes(0)
  })
})
