import { Box, Typography } from '@mui/material'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { useStyles } from 'ui/UIKit/Header/components/UserDropdown/UserDropdownInfo/UserDropdownInfo.styles'
import { CustomAvatar } from 'ui/CustomAvatar'
import { UserRoleStatus } from 'ui/UIKit/Header/components/UserDropdown/UserRoleStatus/UserRoleStatus'
// TODO Remove mocked hook after demo
import { useAuth } from 'ui/UIKit/Header/hooks/mock/useAuth'
// import { useAuth } from 'hooks/auth/useAuth'
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
      {/* TODO Needs to add functionality for showing photo, as in old component below */}
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
