/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Listings } from 'v2/app/pages/authorizer/pages/listings/Listings'
import { AuthorizerTable } from 'v2/app/pages/authorizer/components/AuthorizerTable'
import { columns } from 'v2/app/pages/authorizer/pages/listings/columns'

jest.mock('v2/app/pages/authorizer/components/AuthorizerTable', () => ({
  AuthorizerTable: jest.fn(() => null)
}))

describe('Listings', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without throwing', async () => {
    render(<Listings />)
  })

  it('renders AuthorizerTable with correct props', async () => {
    render(<Listings />)

    expect(AuthorizerTable).toHaveBeenCalledTimes(1)
    expect(AuthorizerTable).toHaveBeenCalledWith(
      {
        title: 'Listings Module',
        uri: '/exchange/listings/list',
        name: 'authorizerListingsList',
        columns
      },
      {}
    )
  })
})
