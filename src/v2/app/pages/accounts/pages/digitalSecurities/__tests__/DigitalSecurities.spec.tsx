/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DigitalSecurities } from 'v2/app/pages/accounts/pages/digitalSecurities/DigitalSecurities'
import * as DSRouter from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { generateRouter } from '__fixtures__/useRouter'

describe('DigitalSecurities', () => {
  const renderRoutes = jest.fn()
  const label = 'Test Label'
  beforeEach(() => {
    jest.spyOn(DSRouter, 'useDSRouter').mockReturnValue(
      generateRouter({
        current: { path: '', label },
        routes: DSRouter.DSRoute,
        renderRoutes
      })
    )
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

    expect(container).toHaveTextContent(label)
  })

  it('renders routes from hook', () => {
    render(<DigitalSecurities />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
