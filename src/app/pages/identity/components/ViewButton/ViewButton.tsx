import React from 'react'
import { Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface ViewButtonProps {
  link: string
  params?: object
  replace?: boolean
}

export const ViewButton: React.FC<ViewButtonProps> = ({
  link,
  params = {},
  replace = false
}) => (
  <Button
    component={AppRouterLinkComponent}
    color='primary'
    variant='contained'
    disableElevation
    to={link}
    params={params}
    replace={replace}
  >
    View
  </Button>
)
