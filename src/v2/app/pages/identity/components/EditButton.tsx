import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'

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
  <Button color='primary' variant='contained'>
    <AppRouterLink to={link} params={params} replace={replace}>
      Edit
    </AppRouterLink>
  </Button>
)
