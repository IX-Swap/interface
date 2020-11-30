import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface EditButtonProps {
  link: string
  params?: object
  replace?: boolean
}

export const EditButton: React.FC<EditButtonProps> = ({
  link,
  params = {},
  replace = false
}) => (
  <Button
    component={AppRouterLinkComponent}
    color='primary'
    variant='contained'
    to={link}
    params={params}
    replace={replace}
  >
    Edit
  </Button>
)
