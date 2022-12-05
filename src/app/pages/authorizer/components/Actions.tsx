import React, { ReactElement } from 'react'
import { Launch as LaunchIcon } from '@mui/icons-material'
import { Grid, IconButton, Box } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useApproveOrReject } from 'app/pages/authorizer/hooks/useApproveOrReject'
import { getIdFromObj } from 'helpers/strings'
import { history } from 'config/history'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { ActionsDropdownTrigger } from 'app/pages/authorizer/components/ActionsDropdownTrigger'
import { ActionsDropdownContent } from 'app/pages/authorizer/components/ActionsDropdownContent'
import { useLocation } from 'react-router-dom'

export interface ActionsProps<T> {
  item: any
  cacheQueryKey: any
}

export type ActionsType<T> = (props: ActionsProps<T>) => ReactElement

export const Actions = <T,>(props: ActionsProps<T>): JSX.Element => {
  const { item, cacheQueryKey } = props
  const location = useLocation()
  const id: string = (item as any)._id
  const splitted = location.pathname.split('/')
  const status = location.search.split('=')[1]

  const category = splitted[splitted.length - 1]
  const userId: string =
    typeof (item as any).user === 'string'
      ? (item as any).user
      : (item as any).user?._id
  const listingType: string = (item as any).listingType

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
      : category === 'listings' && listingType === 'OTC'
      ? history.push(
          `/app/authorizer/${category}/${userId}/${id}/${listingType}/view`
        )
      : status ===
          ('Approved' || status === 'Rejected' || status === 'Submitted') &&
        category === 'cash-withdrawals'
      ? history.push(`/app/authorizer/${category}/${userId}/${status}/view`)
      : status === ' ' && category === 'cash-withdrawals'
      ? history.push(`/app/authorizer/${category}/${userId}/Submitted/view`)
      : history.push(`/app/authorizer/${category}/${userId}/view`)

  const isUnauthorized = (item as any).status === 'Submitted' || 'Approved'
  const isLoading = isApproving || isRejecting
  const isCommitment = category === 'commitments'
  return (
    <Grid container wrap='nowrap' justifyContent='flex-end'>
      <Grid item>
        <IconButton
          component={AppRouterLinkComponent}
          size='small'
          data-testid='view-button'
          to={
            category === 'virtual-accounts'
              ? `/app/authorizer/${category}/${id}/view`
              : category === 'listings' && listingType === 'OTC'
              ? `/app/authorizer/${category}/${userId}/${id}/${listingType}/view`
              : (status === 'Approved' ||
                status === 'Rejected' ||
                status === 'Submitted') && category === 'cash-withdrawals'
              ? `/app/authorizer/${category}/${userId}/${id}/${status}/view`
              : status === '' && category === 'cash-withdrawals'
              ? `/app/authorizer/${category}/${userId}/${id}/Submitted/view`
              : `/app/authorizer/${category}/${userId}/${id}/view`
          }
          params={{
            itemId: id,
            cacheQueryKey,
            listingType
          }}
        >
          <LaunchIcon color='disabled' />
        </IconButton>
      </Grid>
      <Grid item>
        <Box px={1} />
      </Grid>
      {isCommitment && (item as any).fundStatus !== 'Funds on hold' ? (
        <Grid item style={{ minWidth: 26 }} />
      ) : (
        <Grid item style={{ minWidth: 26 }}>
          {(isUnauthorized || isCommitment) && (
            <Dropdown
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
      )}
    </Grid>
  )
}
