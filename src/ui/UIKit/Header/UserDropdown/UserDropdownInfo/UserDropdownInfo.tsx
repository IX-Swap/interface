import { Box, Typography } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { UserRoleStatus } from 'app/components/UserDropdown/UserRoleStatus'
import { useStyles } from './UserDropdownInfo.styles'
import { CustomAvatar } from 'ui/CustomAvatar'
// import { Avatar } from 'components/Avatar'

export const UserDropdownInfo = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const { data } = useIndividualIdentity()

  if (user === undefined) {
    return null
  }

  const { email, name } = user

  return (
    <Box className={classes.wrapper}>
      {/* TODO Needs to fix functionality for showing photo */}
      <CustomAvatar size={64} src={data?.photo}>
        {name[0]}
      </CustomAvatar>
      {/* <Avatar */}
      {/*  borderRadius={'50%'} */}
      {/*  size={64} */}
      {/*  documentId={data?.photo} */}
      {/*  ownerId={user._id} */}
      {/* > */}
      {/*  {name[0]} */}
      {/* </Avatar> */}
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant='subtitle1' className={classes.name}>
          {name}
        </Typography>
        <Typography color='textSecondary' className={classes.email}>
          {email}
        </Typography>
        <UserRoleStatus />
      </Box>
    </Box>
  )
}
