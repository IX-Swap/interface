import { RedirectToDefaultPage } from 'app/RedirectToDefaultPage'
import * as useIsAccredited from 'helpers/acl'
import React from 'react'
import { render } from 'test-utils'
import { history } from 'config/history'
import { AppRoute } from 'app/router/config'

describe('RedirectToDefaultPage', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    jest
      .spyOn(useIsAccredited, 'useIsAccredited')
      .mockImplementation(() => true as any)

    render(<RedirectToDefaultPage />)
  })

  it('renders Identity Page when isAccredited is false', () => {
    jest
      .spyOn(useIsAccredited, 'useIsAccredited')
      .mockImplementation(() => false as any)

    render(<RedirectToDefaultPage />)
    expect(history.location.pathname).toEqual(AppRoute.identity)
  })
})
