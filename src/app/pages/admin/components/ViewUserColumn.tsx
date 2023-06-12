import React from 'react'
import { IconButton } from '@mui/material'
// import { Launch } from '@mui/icons-material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions.styles'
import { AdminRoute } from 'app/pages/admin/router/config'
import { ReactComponent as LaunchIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
export interface ViewUserColumnProps {
  userId: string
}

export const ViewUserColumn = ({ userId }: ViewUserColumnProps) => {
  const classes = useStyles()
  return (
    <IconButton
      className={classes.button}
      component={AppRouterLinkComponent}
      size='medium'
      to={AdminRoute.view}
      params={{ userId: userId }}
    >
      <LaunchIcon color='disabled' />
    </IconButton>
  )
}
