import { ManagedUser } from 'types/user'
import React from 'react'
import { Grid, Typography, Box, Chip } from '@mui/material'
import { ActionEnableToggle } from './ActionEnableToggle'
import { useStyles } from './UserDetails.styles'

export interface UserVerificationStatusProps {
  data: ManagedUser
}

export const UserAccountStatus = ({ data }: UserVerificationStatusProps) => {
  const { isResetActive } = data
  const classes = useStyles()
  const {
    enableChipText,
    enableChipBackground,
    pendingChipBackground,
    pendingChipText
  } = classes

  return (
    <Grid sx={{ display: 'flex' }} gap={1}>
      <Grid item>
        <Typography>Account Status</Typography>
        {!isResetActive ? (
          <Grid style={{ marginTop: '11px' }} item>
            <Chip
              label={<Box className={enableChipText}>Enabled</Box>}
              className={enableChipBackground}
            />
          </Grid>
        ) : (
          <Grid style={{ marginTop: '11px' }} item>
            <Chip
              label={<Box className={pendingChipText}>Pending</Box>}
              className={pendingChipBackground}
            />
          </Grid>
        )}
      </Grid>

      <Grid style={{ marginTop: '27px' }} item>
        <ActionEnableToggle enabled={data.enabled} />
      </Grid>
    </Grid>
  )
}

// <Grid container spacing={1}>
//   {data.enabled ? (
//     <Grid item>
//       <Status status='Enabled' />
//     </Grid>
//   ) : null}
//   {data.twoFactorAuth ? (
//     <Grid item>
//       <Status status='2FA Enabled' />
//     </Grid>
//   ) : null}
//   {data.verified ? (
//     <Grid item>
//       <Status status='Verified' variant='success' />
//     </Grid>
//   ) : null}
// </Grid>
