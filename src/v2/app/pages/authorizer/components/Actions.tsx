import { useAuthorizerTableStore } from 'v2/app/pages/authorizer/context'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import React, { ReactElement } from 'react'
import {
  AssignmentTurnedIn as ApproveIcon,
  Gavel as RejectIcon,
  Launch as LaunchIcon,
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'
import { Grid, IconButton, Paper } from '@material-ui/core'
import { Action } from 'v2/app/pages/authorizer/components/Action'
import { DropdownMenu } from 'v2/app/pages/authorizer/components/DropdownMenu'
import { useApproveOrReject } from 'v2/app/pages/authorizer/hooks/useApproveOrReject'

export interface ActionsProps<T> {
  item: T
  onView?: (row?: T) => void
}

export type Actions<T> = (props: ActionsProps<T>) => ReactElement

export const Actions = <T,>(props: ActionsProps<T>): JSX.Element => {
  const { onView, item } = props
  const { uri, _getItemId } = useAuthorizerTableStore()
  const [approve] = useApproveOrReject(uri, _getItemId(item), 'approve')
  const [reject] = useApproveOrReject(uri, _getItemId(item), 'reject')
  const classes = useStyles()
  const isUnauthorized = (item as any).status === 'Submitted'
  const viewItem = (): void => {
    if (onView !== undefined) onView(item)
  }

  return (
    <Grid container>
      <IconButton onClick={viewItem} data-testid='view-button'>
        <LaunchIcon className={classes.viewColor} />
      </IconButton>

      {isUnauthorized && (
        <DropdownMenu
          toggle={
            <IconButton data-testid='more-button'>
              <MoreHorizIcon className={classes.moreColor} />
            </IconButton>
          }
          content={
            <Paper className={classes.popover} data-testid='dropdown'>
              <Action label='Approve' icon={ApproveIcon} onClick={approve} />
              <Action label='Reject' icon={RejectIcon} onClick={reject} />
              <Action label='View' icon={LaunchIcon} onClick={viewItem} />
            </Paper>
          }
        />
      )}
    </Grid>
  )
}
