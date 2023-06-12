import { ManagedUser } from 'types/user'
import React from 'react'
import { Grid, Typography, Box, Chip } from '@mui/material'
import { ActionResetPassword } from './ActionResetPassword'
import { useStyles } from './UserDetails.styles'

export interface UserVerificationStatusProps {
  data: ManagedUser
}

export const UserVerificaionStatus = ({
  data
}: UserVerificationStatusProps) => {
  const { verified } = data
  const classes = useStyles()
  const {
    enableChipText,
    enableChipBackground,
    pendingChipBackground,
    pendingChipText
  } = classes
  return (
    <Grid sx={{ display: 'flex' }} gap={2}>
      <Grid item>
        <Typography>Verification Status</Typography>
        {verified ? (
          <Grid style={{ marginTop: '11px' }} item>
            <Chip
              label={<Box className={enableChipText}>Verified</Box>}
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
        <ActionResetPassword data={data} />
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
