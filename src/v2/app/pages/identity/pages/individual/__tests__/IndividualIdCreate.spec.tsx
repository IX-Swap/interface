/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { IndividualIdCreate } from 'v2/app/pages/identity/pages/individual/IndividualIdCreate'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('IndividualIdCreate', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdCreate />)
  })

  it('renders edit link', () => {
    render(<IndividualIdCreate />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        children: 'Cancel',
        to: IdentityRoute.individual
      },
      {}
    )
  })
})
