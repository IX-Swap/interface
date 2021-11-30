import React, { ReactElement } from 'react'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { Grid, IconButton, Box } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useApproveOrReject } from 'app/pages/authorizer/hooks/useApproveOrReject'
import { getIdFromObj } from 'helpers/strings'
import { history } from 'config/history'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { ActionsDropdownTrigger } from 'app/pages/authorizer/components/ActionsDropdownTrigger'
import { ActionsDropdownContent } from 'app/pages/authorizer/components/ActionsDropdownContent'
import { useLocation } from 'react-router'

export interface ActionsProps<T> {
  item: T
  cacheQueryKey: any
}

export type ActionsType<T> = (props: ActionsProps<T>) => ReactElement

export const Actions = <T,>(props: ActionsProps<T>): JSX.Element => {
  const { item, cacheQueryKey } = props
  const { pathname } = useLocation()
  const id: string = (item as any)._id
  const splitted = pathname.split('/')
  const category = splitted[splitted.length - 1]
  const userId: string =
    typeof (item as any).user === 'string'
      ? (item as any).user
      : (item as any).user?._id

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
    category === 'virtual-accounts'
      ? history.push(`/app/authorizer/${category}/${id}/view`)
      : history.push(`/app/authorizer/${category}/${userId}/${id}/view`)

  const isUnauthorized = (item as any).status === 'Submitted'
  const isLoading = isApproving || isRejecting
  const isCommitment = category === 'commitments'

  return (
    <Grid container wrap='nowrap' justify='flex-end'>
      <Grid item>
        <IconButton
          component={AppRouterLinkComponent}
          size='small'
          data-testid='view-button'
          to={
            category === 'virtual-accounts'
              ? `/app/authorizer/${category}/${id}/view`
              : `/app/authorizer/${category}/${userId}/${id}/view`
          }
          params={{
            itemId: id,
            cacheQueryKey
          }}
        >
          <LaunchIcon color='disabled' />
        </IconButton>
      </Grid>
      <Grid item>
        <Box px={1} />
      </Grid>
      {isCommitment && (item as any).fundStatus !== 'Funds on hold' ? (
        <></>
      ) : (
        <>
          <Grid item style={{ minWidth: 26 }}>
            {(isUnauthorized || isCommitment) && (
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
      )}
    </Grid>
  )
}
