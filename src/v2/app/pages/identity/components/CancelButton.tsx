import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'

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
  <Button color='primary'>
    <AppRouterLink to={link} params={params} replace={replace}>
      Cancel
    </AppRouterLink>
  </Button>
)
