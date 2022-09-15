import React from 'react'
import { render } from 'test-utils'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { IssuanceRoute as paths } from 'app/pages/issuance/router/config'
import { AddListingButton } from 'app/pages/issuance/components/SecondaryListingsTable/AddListingButton'

jest.mock('@mui/material/Button', () => jest.fn(() => null))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('AddListingButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Button with correct props', () => {
    render(<AddListingButton />)

    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        component: AppRouterLinkComponent,
        to: paths.createListing,
        color: 'primary',
        variant: 'contained',
        children: 'Create a New Listing'
      }),
      {}
    )
  })
})
