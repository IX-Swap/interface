import React, { ReactElement } from 'react'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import {
  AssignmentTurnedIn as ApproveIcon,
  Gavel as RejectIcon,
  Launch as LaunchIcon,
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'
import { Grid, IconButton, Paper, Box } from '@material-ui/core'
import { useAuthorizerRouter } from '../router'
import User from 'v2/types/user'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { Action } from 'v2/app/pages/authorizer/components/Action'
import { DropdownMenu } from 'v2/app/pages/authorizer/components/DropdownMenu'
import { useApproveOrReject } from 'v2/app/pages/authorizer/hooks/useApproveOrReject'
import { getIdFromObj } from 'v2/helpers/strings'

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
  const { current } = useAuthorizerRouter()
  const classes = useStyles()
  const id = (item as any)._id
  const splitted = current.path.split('/')
  const category = splitted[splitted.length - 1]

  const [approve, { isLoading: isApproveLoading }] = useApproveOrReject(
    getIdFromObj(item),
    'approve'
  )
  const [reject, { isLoading: isRejectLoading }] = useApproveOrReject(
    getIdFromObj(item),
    'reject'
  )
  const isUnauthorized = (item as any).status === 'Submitted'
  const showActionDropdown =
    !isApproveLoading && !isRejectLoading && isUnauthorized

  return (
    <Grid container>
      <Grid item>
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

      {showActionDropdown && (
        <>
          <Box px={1} />
          <Grid item>
            <DropdownMenu
              toggle={
                <IconButton data-testid='more-button' size='small'>
                  <MoreHorizIcon className={classes.moreColor} />
                </IconButton>
              }
              content={
                <Paper className={classes.popover} data-testid='dropdown'>
                  <Action
                    label='Approve'
                    icon={ApproveIcon}
                    onClick={approve}
                  />
                  <Action label='Reject' icon={RejectIcon} onClick={reject} />
                </Paper>
              }
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}
