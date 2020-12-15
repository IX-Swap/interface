import React from 'react'
import { render, cleanup } from 'test-utils'
import { DigitalSecurities } from 'app/pages/accounts/pages/digitalSecurities/DigitalSecurities'
import * as DSRouter from 'app/pages/accounts/pages/digitalSecurities/router'

describe('DigitalSecurities', () => {
  const renderRoutes = jest.fn(() => <div />)
  const label = 'Test Label'

  beforeEach(() => {
    jest.spyOn(DSRouter, 'useDSRouter').mockImplementation(() => ({
      current: { path: '', label },
      paths: DSRouter.DSRoute,
      renderRoutes,
      routes: [],
      push: jest.fn(),
      replace: jest.fn(),
      query: new URLSearchParams(),
      params: {}
    }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DigitalSecurities />)
  })

  it('renders routes from hook', () => {
    render(<DigitalSecurities />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
