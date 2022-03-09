import React from 'react'
import { IconButton } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AppFeature } from 'types/app'
import { Notification } from 'types/notification'

export interface NotificationGoToItemProps {
  data: Notification
  dismiss: () => void
}

export const NotificationGoToItem = (props: NotificationGoToItemProps) => {
  const { data, dismiss } = props
  // TODO make sure backend and frontend have the agreement on this schema to avoid extra checks
  let url = `/app/${data.service}/${data.feature}/${data.resourceId}/view`

  if (data.feature === AppFeature.Commitments) {
    url = `/app/invest/${data.feature}/${data.resourceId}/view`
  }

  if (data.feature === AppFeature.Individuals) {
    url = `/app/identity/${data.feature}/view`
  }

  if (
    data.feature === AppFeature.Deposits ||
    data.feature === AppFeature.Withdrawals ||
    data.feature === AppFeature.DigitalSecurityWithdrawals ||
    data.feature === AppFeature.Authentication ||
    (data?.service?.toUpperCase() === 'EXCHANGE' &&
      data?.subject?.toUpperCase() === 'ORDER CREATED')
  ) {
    return null
  }

  return (
    <div onClick={dismiss}>
      <IconButton size='small' component={AppRouterLinkComponent} to={url}>
        <ArrowForward />
      </IconButton>
    </div>
  )
}
