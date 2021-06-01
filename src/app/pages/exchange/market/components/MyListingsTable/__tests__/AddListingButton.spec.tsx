import React from 'react'
import { render, cleanup } from 'test-utils'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@material-ui/core'
import { OTCMarketRoute as paths } from 'app/pages/exchange/router/config'
import { AddListingButton } from '../AddListingButton'

jest.mock('@material-ui/core/Button', () => jest.fn(() => null))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('AddListingButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
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
