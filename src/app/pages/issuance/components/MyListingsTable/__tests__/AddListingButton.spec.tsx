import React from 'react'
import { render } from 'test-utils'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { IssuanceRoute as paths } from 'app/pages/issuance/router/config'
import { AddListingButton } from 'app/pages/issuance/components/MyListingsTable/AddListingButton'

jest.mock('@mui/material/Button', () => jest.fn(() => null))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('AddListingButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', async () => {
    render(<AddListingButton />)
  })

  it('renders Button with correct props', () => {
    render(<AddListingButton />)

    expect(Button).toHaveBeenCalledWith(
      {
        component: AppRouterLinkComponent,
        to: paths.createListing,
        size: 'small',
        color: 'primary',
        variant: 'outlined',
        children: 'Create a new listing'
      },
      {}
    )
  })
})
