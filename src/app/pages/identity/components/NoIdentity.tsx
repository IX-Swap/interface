import React from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import {
  IdentityRoute,
  useIdentitiesRouter
} from 'app/pages/identity/router'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

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
        <Button
          component={AppRouterLinkComponent}
          color='primary'
          variant='contained'
          to={paths[link]}
        >
          {text}
        </Button>
      </Box>
    </Grid>
  )
}
