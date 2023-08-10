import {
  Grid,
  Paper
  // Typography, Button, useMediaQuery
} from '@mui/material'
// import { SecurityRoute } from 'app/pages/security/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { isUpdatedAtMoreThanAYear } from 'hooks/utils'
import React from 'react'
// import { Icon } from 'ui/Icons/Icon'
// import { useTheme } from '@mui/material/styles'
import { InfoIcon } from 'app/components/TwoFADialog/InfoIcon'
import { Description } from 'app/components/TwoFADialog/Description/Description'
import { Actions } from 'app/components/TwoFADialog/Actions/Actions'
import { useStyles } from 'app/components/Header/components/TwoFADropdown/TwoFADropdownContent/TwoFADropdownContent.styles'

export const TwoFANotice = () => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa, updatedAt } = user
  const hasEnabled = enable2Fa ?? false
  const isMoreThanAYear = isUpdatedAtMoreThanAYear(updatedAt)
  //   const theme = useTheme()
  //   const matches = useMediaQuery(theme.breakpoints.down('md'))
  const classes = useStyles()

  //   if ((user !== undefined && user.enable2Fa === true) || matches) {
  return !hasEnabled || isMoreThanAYear ? (
    <Paper sx={{ p: 5, borderRadius: 2 }}>
      <Grid container direction='column' textAlign={'center'}>
        <Grid item className={classes.iconBlock}>
          <InfoIcon enable2Fa={user?.enable2Fa} />
        </Grid>
        <Grid item>
          <Description enable2Fa={user?.enable2Fa} />
        </Grid>
        <Grid item>
          <Actions
            enable2fa={user?.enable2Fa}
            hideSecondButton={user?.enable2Fa === false}
          />
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <></>
  )
  //   }

  //   return (
  //     <Paper sx={{ p: 5, borderRadius: 2 }}>
  //       <Grid container spacing={2}>
  //         <Grid item container spacing={2} justifyContent='space-between' xs={12}>
  //           <Grid item>
  //             <Typography variant='h5'>2FA</Typography>
  //           </Grid>
  //           <Grid item>
  //             <Icon name='security' color='#4C88FF' />
  //           </Grid>
  //         </Grid>
  //         <Grid item xs={12}>
  //           <Typography
  //             variant='body1'
  //             color='textSecondary'
  //             sx={{ mb: 1, mr: 2.5 }}
  //           >
  //             Secure your account with two-factor authentication
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={12}>
  //           <Button variant='outlined' fullWidth href={SecurityRoute.setup2fa}>
  //             Enable 2FA
  //           </Button>
  //         </Grid>
  //       </Grid>
  //     </Paper>
  //   )
}
