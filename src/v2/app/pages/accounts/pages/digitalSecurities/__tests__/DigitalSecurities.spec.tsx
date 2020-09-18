/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DigitalSecurities } from 'v2/app/pages/accounts/pages/digitalSecurities/DigitalSecurities'
import * as DSRouter from 'v2/app/pages/accounts/pages/digitalSecurities/router'

describe('DigitalSecurities', () => {
  const renderRoutes = jest.fn()

  beforeEach(() => {
    jest.spyOn(DSRouter, 'useDSRouter').mockImplementation(() => ({
      push: jest.fn(),
      query: new URLSearchParams(),
      current: {
        path: '',
        label: 'Test Label'
      },
      routes: DSRouter.DSRoute,
      renderRoutes
    }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DigitalSecurities />)
  })

  it("renders label if current path doesn't  match", () => {
    const { container } = render(<DigitalSecurities />)
    expect(container).toHaveTextContent('Test Label')
  })

  it('invokes renderRoutes', () => {
    render(<DigitalSecurities />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
