import React from 'react'
import { Grid } from '@mui/material'
import { ActionReset2FA } from 'app/pages/admin/components/ActionReset2FA'
import { ActionEnableToggle } from 'app/pages/admin/components/ActionEnableToggle'
import { ActionResetPassword } from 'app/pages/admin/components/ActionResetPassword'
import { ManagedUser } from 'types/user'

export interface UserActionsProps {
  data: ManagedUser
}
export const UserActions = ({ data }: UserActionsProps) => {
  return (
    <>
      <Grid container spacing={3}>
        {data.twoFactorAuth ? (
          <Grid item>
            <ActionReset2FA />
          </Grid>
        ) : null}
        <Grid item>
          <ActionResetPassword data={data} />
        </Grid>
        <Grid item>
          <ActionEnableToggle enabled={data.enabled} />
        </Grid>
      </Grid>
    </>
  )
}
