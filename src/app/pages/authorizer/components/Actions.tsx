import React, { ReactElement } from 'react'
// import { Launch as LaunchIcon } from '@mui/icons-material'
import {
  Grid
  //  IconButton,
  //   Box
} from '@mui/material'
// import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useApproveOrReject } from 'app/pages/authorizer/hooks/useApproveOrReject'
import { getIdFromObj } from 'helpers/strings'
import { history } from 'config/history'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { ActionsDropdownTrigger } from 'app/pages/authorizer/components/ActionsDropdownTrigger'
import { ActionsDropdownContent } from 'app/pages/authorizer/components/ActionsDropdownContent'
import { useLocation } from 'react-router-dom'
import { get } from 'lodash'

export interface ActionsProps {
  item: any
  cacheQueryKey: any
  featureCategory?: string
  statusFieldName?: string
}

export type ActionsType = (props: ActionsProps) => ReactElement

const getUserId = (item: any) => {
  if (typeof item.user === 'string') {
    return item.user
  }

  if (typeof item.createdBy === 'string') {
    return item.createdBy
  }

  return item.user?._id
}

export const Actions = (props: ActionsProps): JSX.Element => {
  const {
    item,
    cacheQueryKey,
    featureCategory,
    statusFieldName = 'status'
  } = props
  const location = useLocation()
  const id: string = item._id
  const splitted = location.pathname.split('/')
  const status = location.search.split('=')[1]

  const category =
    typeof featureCategory !== 'undefined'
      ? featureCategory
      : splitted[splitted.length - 1]
  const userId: string = getUserId(item)
  const listingType: string = item.listingType
  //   console.log(props.item, 'propsdpdppd')
  const [approve, { isLoading: isApproving }] = useApproveOrReject({
    id: getIdFromObj(item),
    action: 'approve',
    cacheQueryKey,
    listingType,
    featureCategory
  })

  const [reject, { isLoading: isRejecting }] = useApproveOrReject({
    id: getIdFromObj(item),
    action: 'reject',
    cacheQueryKey,
    listingType,
    featureCategory
  })

  const view = () =>
    category === 'virtual-accounts'
      ? history.push(`/app/authorizer/${category}/${id}/view`)
      : category === 'listings' && listingType === 'OTC'
      ? history.push(
          `/app/authorizer/${category}/${userId}/${id}/${listingType}/view`
        )
      : (status === 'Approved' ||
          status === 'Rejected' ||
          status === 'Submitted') &&
        category === 'cash-withdrawals'
      ? history.push(
          `/app/authorizer/${category}/${userId}/${id}/${status}/view`
        )
      : status === '' && category === 'cash-withdrawals'
      ? history.push(
          `/app/authorizer/${category}/${userId}/${id}/Submitted/view`
        )
      : category === 'individuals/accreditation'
      ? history.push(
          `/app/authorizer/individuals/${userId}/${id}/view?tab=accreditation`
        )
      : category === 'corporates/accreditation'
      ? history.push(
          `/app/authorizer/corporates/${userId}/${id}/view?tab=accreditation`
        )
      : history.push(`/app/authorizer/${category}/${userId}/${id}/view`)
  //   console.log(
  //     category,
  //     listingType,
  //     userId,
  //     id,
  //     status,
  //     'category,listingType,userId, id,status'
  //   )
  const isUnauthorized = item.status === 'Submitted' || 'Approved'
  const isLoading = isApproving || isRejecting
  const isCommitment = category === 'commitments'
  const statusField = get(item, statusFieldName)

  return (
    <Grid wrap='nowrap' justifyContent='flex-end'>
      {/* <Grid item>
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
                  status === 'Submitted') &&
                category === 'cash-withdrawals'
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
      </Grid> */}
      {/* <Grid item>
        <Box px={1} />
      </Grid> */}
      {isCommitment && item.fundStatus !== 'Funds on hold' ? (
        <Grid item style={{ minWidth: 26 }} />
      ) : (
        <Grid item>
          {(Boolean(isUnauthorized) || isCommitment) && (
            <Dropdown
              contentTheme='dark'
              trigger={props => (
                <ActionsDropdownTrigger {...props} isLoading={isLoading} />
              )}
              content={props => (
                <ActionsDropdownContent
                  {...props}
                  hideApproval={
                    !['Submitted', 'PENDING', 'Rejected'].includes(statusField)
                  }
                  hideRejection={
                    !['Submitted', 'PENDING', 'Approved'].includes(statusField)
                  }
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
