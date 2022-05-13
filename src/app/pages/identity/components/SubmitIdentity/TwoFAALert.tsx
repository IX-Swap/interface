// import React from 'react'
// import { useStyles } from 'app/pages/identity/components/SubmitIdentity/SubmitIdentity.style'
// import { Button, Grid, Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import { useAuth } from 'hooks/auth/useAuth'
// import { ReactComponent as Enabled } from 'assets/icons/2fa/security-enabled.svg'
// import { ReactComponent as Disabled } from 'assets/icons/2fa/security-disabled.svg'
// // import { IdentityRoute } from 'app/pages/identity/router/config'

// export const TwoFAALert = () => {
//   const classes = useStyles()
//   const { user = { enable2Fa: undefined } } = useAuth()
//   const { enable2Fa } = user
//   return (
//     <Box>
//        {enable2Fa ?
//         (<Box className={classes.boxAlert} height={284}>
//             <Grid className={classes.icon2fa}>
//                 <Enabled height={100} width={81.82} />
//             </Grid>
//             <Grid className={classes.mainContent}>
//                 <Typography variant='h2'>
//                     Account Protected
//                 </Typography>
//                 <Typography className={classes.text} mt={2}>
//                     Your account is now protected by Two-Factor Authentication
//                 </Typography>
//                 <Button variant='outlined' size='large'>
//                     Update 2FA
//                 </Button>
//             </Grid>
//         </Box>) :
//         (
//             <Box className={classes.boxAlert} height={326}>
//                 <Grid className={classes.icon2fa}>
//                     <Disabled height={100} width={81.82} />
//                 </Grid>
//                 <Grid className={classes.mainContent}>
//                     <Typography variant='h2'>
//                       Protect your account!
//                     </Typography>
//                     <Typography className={classes.text} mt={2} color='#F56283'>
//                     Your account is currently at risk as Two Factor Authentication (2FA) is not enabled now.
//                     We urge you to activate this feature as soon as posible.
//                     </Typography>
//                     <Button variant='contained' size='large'>
//                       Enable 2FA
//                     </Button>
//                 </Grid>

//             </Box>
//         )}
//     </Box>

//   )
// }
