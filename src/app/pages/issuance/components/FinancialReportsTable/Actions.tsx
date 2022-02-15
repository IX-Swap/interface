import React from 'react'
import { FinancialReport } from 'types/financitalReport'
import { IconButton } from '@mui/material'
import { Launch } from '@mui/icons-material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export interface ActionsProps {
  item: FinancialReport
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      to={IssuanceRoute.viewReport}
      params={{ reportId: item._id }}
      size='small'
    >
      <Launch color='disabled' style={{ width: 23, height: 23 }} />
    </IconButton>
  )
}
