import * as IconButton from '@mui/material'
import { OTCMarketRoute as paths } from 'app/pages/exchange/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { render } from 'test-utils'
import { Listing } from 'types/listing'
import { Actions } from '../Actions'

jest.mock('@mui/material/IconButton', () => jest.fn(() => null))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('Actions', () => {
  const item = { _id: '12345' }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders IconButton with correct props', () => {
    render(<Actions item={item as Listing} />)

    expect(IconButton).toHaveBeenCalledWith(
      expect.objectContaining({
        component: AppRouterLinkComponent,
        to: paths.viewListing,
        params: { listingId: item._id },
        size: 'small'
      }),
      {}
    )
  })
})
