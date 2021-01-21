import React from 'react'
import { Grid } from '@material-ui/core'
import { ActionReset2FA } from 'app/pages/admin/components/ActionReset2FA'
import { ActionEnableToggle } from 'app/pages/admin/components/ActionEnableToggle'
import { User } from 'app/pages/admin/hooks/useUserById'
import { ActionResetPassword } from 'app/pages/admin/components/ActionResetPassword'

export interface UserActionsProps {
  data: User
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
          <ActionResetPassword email={data.email} />
        </Grid>
        <Grid item>
          <ActionEnableToggle enabled={data.enabled} />
        </Grid>
      </Grid>
    </>
  )
}
