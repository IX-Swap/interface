import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

export interface CancelButtonProps {
  link: string
  params?: object
  replace?: boolean
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  link,
  params = {},
  replace = false
}) => (
  <Button
    component={AppRouterLinkComponent}
    color='primary'
    to={link}
    params={params}
    replace={replace}
  >
    Cancel
  </Button>
)
