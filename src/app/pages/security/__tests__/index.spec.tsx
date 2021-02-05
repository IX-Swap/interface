import React from 'react'
import { render, cleanup } from 'test-utils'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import * as useSecurityRouter from 'app/pages/security/router'

describe('SecurityRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders routes from hook', () => {
    const renderRoutes = jest.fn(() => <div />)
    const paths = jest.fn(() => ({}))

    jest
      .spyOn(useSecurityRouter, 'useSecurityRouter')
      .mockImplementation(() => ({ renderRoutes, paths } as any))

    render(<SecurityRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
