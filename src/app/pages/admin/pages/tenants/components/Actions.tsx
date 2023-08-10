import React from 'react'
import { ReactComponent as ViewIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
import { ReactComponent as EditIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/edit.svg'
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions.styles'
import { IconButton, Box } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'
import { DialogDeleteTenant } from './DialogDeleteTenant'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'

export const Actions = ({ item }: any) => {
  const { deleteTenantOpen, closeDeleteTenant, openDeleteTenant } =
    useUserActionsDialog()
  const classes = useStyles()

  const handleOpenDeleteTenant = () => {
    openDeleteTenant()
  }
  return (
    <Box display={'flex'} justifyContent={'flex-start'}>
      <IconButton
        component={AppRouterLinkComponent}
        size='medium'
        to={AdminRoute.editTenant}
        params={{ tenantId: item._id }}
        className={classes.button}
      >
        <EditIcon color='disabled' />
      </IconButton>
      <IconButton
        component={AppRouterLinkComponent}
        size='medium'
        to={AdminRoute.viewTenant}
        params={{ tenantId: item._id }}
        className={classes.button}
      >
        <ViewIcon color='disabled' />
      </IconButton>
      <>
        <IconButton
          size='medium'
          className={classes.button}
          onClick={handleOpenDeleteTenant}
        >
          <DeleteIcon color='disabled' />
        </IconButton>
        <DialogDeleteTenant
          id={item._id}
          closeDialog={closeDeleteTenant}
          open={deleteTenantOpen}
        />
      </>
    </Box>
  )
}
