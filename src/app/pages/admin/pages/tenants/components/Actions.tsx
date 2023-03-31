import React from 'react'
import { ReactComponent as ViewIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
import { ReactComponent as EditIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/edit.svg'
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions.styles'
import { IconButton, Box } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'
import { useDeleteTenant } from 'app/pages/admin/hooks/useDeleteTenant'

export const Actions = ({ item }: any) => {
  const classes = useStyles()
  const [deleteTenant] = useDeleteTenant(item._id)
  return (
    <Box display={'flex'} justifyContent={'flex-start'}>
      <IconButton
        component={AppRouterLinkComponent}
        size='medium'
        to={AdminRoute.viewTenant}
        params={{ tenantId: item._id }}
        className={classes.button}
      >
        <EditIcon color='disabled' />
      </IconButton>
      <IconButton
        component={AppRouterLinkComponent}
        size='medium'
        to={AdminRoute.editTenant}
        params={{ tenantId: item._id }}
        className={classes.button}
      >
        <ViewIcon color='disabled' />
      </IconButton>
      <IconButton
        size='medium'
        className={classes.button}
        onClick={async () => await deleteTenant()}
      >
        <DeleteIcon color='disabled' />
      </IconButton>
    </Box>
  )
}
