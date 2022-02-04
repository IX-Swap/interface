import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { FinancialReport } from 'types/financitalReport'

export interface ActionsProps {
  item: FinancialReport
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <Link
      to={generatePath(IssuanceRoute.viewReport, { id: item._id })}
      component={IconButton}
    >
      <Launch color='disabled' style={{ width: 23, height: 23 }} />
    </Link>
  )
}
