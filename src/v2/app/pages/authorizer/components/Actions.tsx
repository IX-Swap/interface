import React, { ReactElement } from 'react'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { Grid, IconButton } from '@material-ui/core'
import { useAuthorizerRouter } from '../router'
import User from 'v2/types/user'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { AuthorizerBanksRoute } from 'v2/app/pages/authorizer/pages/banks/router'

export interface ActionsProps<T> {
  item: T
  cacheQueryKey: any
}

export const getItemOwnerId = (user: string | User) => {
  return typeof user === 'string' ? user : user._id
}

export type Actions<T> = (props: ActionsProps<T>) => ReactElement

export const Actions = <T,>(props: ActionsProps<T>): JSX.Element => {
  const { item, cacheQueryKey } = props
  const { push, current } = useAuthorizerRouter()
  const classes = useStyles()
  const id = (item as any)._id
  const splitted = current.path.split('/')
  const category = splitted[splitted.length - 1]

  return (
    <Grid container>
      <IconButton
        component={AppRouterLinkComponent}
        size='small'
        data-testid='view-button'
        to={`/app/authorizer/${category}/${id as string}/view`}
        params={{
          itemId: id,
          cacheQueryKey
        }}
      >
        <LaunchIcon className={classes.viewColor} />
      </IconButton>
    </Grid>
  )
}
