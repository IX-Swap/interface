import React, { ReactElement } from 'react'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { Grid, IconButton, Box } from '@material-ui/core'
import { useAuthorizerRouter } from '../router'
import User from 'types/user'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useApproveOrReject } from 'app/pages/authorizer/hooks/useApproveOrReject'
import { getIdFromObj } from 'helpers/strings'
import { history } from 'config/history'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { ActionsDropdownTrigger } from 'app/pages/authorizer/components/ActionsDropdownTrigger'
import { ActionsDropdownContent } from 'app/pages/authorizer/components/ActionsDropdownContent'

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
  const id = (item as any)._id
  const splitted = current.path.split('/')
  const category = splitted[splitted.length - 1]
  const [approve, { isLoading: isApproving }] = useApproveOrReject({
    id: getIdFromObj(item),
    action: 'approve',
    cacheQueryKey
  })
  const [reject, { isLoading: isRejecting }] = useApproveOrReject({
    id: getIdFromObj(item),
    action: 'reject',
    cacheQueryKey
  })
  const view = () =>
    history.push(`/app/authorizer/${category}/${id as string}/view`)
  const isUnauthorized = (item as any).status === 'Submitted'
  const isLoading = isApproving || isRejecting

  return (
    <Grid container wrap='nowrap' justify='flex-end'>
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
          <LaunchIcon color='disabled' />
        </IconButton>
      </Grid>
      <>
        <Grid item>
          <Box px={1} />
        </Grid>
        <Grid item style={{ minWidth: 26 }}>
          {isUnauthorized && (
            <Dropdown
              arrow
              contentTheme='dark'
              trigger={props => (
                <ActionsDropdownTrigger {...props} isLoading={isLoading} />
              )}
              content={props => (
                <ActionsDropdownContent
                  {...props}
                  approve={approve}
                  reject={reject}
                  view={view}
                />
              )}
            />
          )}
        </Grid>
      </>
    </Grid>
  )
}
