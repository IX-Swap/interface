import React from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import {
  IdentityRoute,
  useIdentitiesRouter
} from 'v2/app/pages/identity/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export interface NoIdentityProps {
  text: string
  link: keyof typeof IdentityRoute
}

export const NoIdentity: React.FC<NoIdentityProps> = props => {
  const { text, link } = props
  const { paths } = useIdentitiesRouter()

  return (
    <Grid container justify='center' alignItems='center'>
      <Box padding={4}>
        <Button color='primary' variant='contained'>
          <AppRouterLink to={paths[link]}>{text}</AppRouterLink>
        </Button>
      </Box>
    </Grid>
  )
}
