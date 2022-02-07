import React from 'react'
import { Button } from '@mui/material'
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
    variant='outlined'
    to={link}
    params={params}
    replace={replace}
    disableElevation
  >
    Edit
  </Button>
)
