/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdCreate } from 'v2/app/pages/identity/pages/corporate/CorporateIdCreate'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
// import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('CorporateIdCreate', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateIdCreate />)
  })

  it('renders cancel link', () => {
    render(<CorporateIdCreate />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        replace: true,
        children: 'Cancel',
        to: IdentityRoute.list
      },
      {}
    )
  })

  // it('renders CorporateIdentityForm', () => {
  //   jest.doMock(
  //     'v2/app/pages/identity/components/CorporateIdentityForm',
  //     () => ({ CorporateIdentityForm: jest.fn(() => null) })
  //   )
  //   render(<CorporateIdCreate />)

  //   expect(CorporateIdentityForm).toHaveBeenCalledTimes(1)
  // })
})
