import React, { ReactElement } from 'react'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { Grid, IconButton } from '@material-ui/core'
import { useAuthorizerRouter } from '../router'
import User from '../../../../types/user'

export interface ActionsProps<T> {
  item: T
  onView?: (row?: T) => void
  cacheQueryKey: any
}

export const getItemOwnerId = (user: string | User) => {
  return typeof user === 'string' ? user : user._id
}

export type Actions<T> = (props: ActionsProps<T>) => ReactElement

export const Actions = <T,>(props: ActionsProps<T>): JSX.Element => {
  const { item, cacheQueryKey } = props
  const { push, current } = useAuthorizerRouter()
  const ownerId = getItemOwnerId((item as any).user)
  const id = (item as any)._id
  const classes = useStyles()

  const viewItem = (): void => {
    const splitted = current.path.split('/')
    const category = splitted[splitted.length - 1]

    push('viewItem', {
      itemId: id,
      category,
      ownerId,
      cacheQueryKey
    })
  }

  return (
    <Grid container>
      <IconButton onClick={viewItem} data-testid='view-button'>
        <LaunchIcon className={classes.viewColor} />
      </IconButton>
    </Grid>
  )
}
