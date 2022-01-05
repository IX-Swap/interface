import React from 'react'
import { render } from 'test-utils'
import { PageHeader } from 'app/pages/issuance/components/Commitments/PageHeader'
import { AppRouterLink } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { Typography } from '@material-ui/core'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

const pageHeaderProps = {
  title: 'Title'
}

describe('PageHeader', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders AppRouterLink with correct props', () => {
    render(<PageHeader {...pageHeaderProps} />)
    expect(AppRouterLink).toHaveBeenCalledWith(
      expect.objectContaining({
        to: IssuanceRoute.view,
        color: 'textPrimary',
        underline: 'none',
        variant: 'h3',
        component: Typography,
        children: pageHeaderProps.title
      }),
      {}
    )
  })
})
