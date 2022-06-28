import { Box, Typography } from '@mui/material'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { useStyles } from 'app/components/Header/components/UserDropdown/UserDropdownInfo/UserDropdownInfo.styles'
import { CustomAvatar } from 'ui/CustomAvatar'
import { UserRoleStatus } from 'app/components/Header/components/UserDropdown/UserRoleStatus/UserRoleStatus'
import { useAuth } from 'hooks/auth/useAuth'

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
      <CustomAvatar
        documentId={data?.photo}
        ownerId={user._id}
        size={64}
        src={data?.photo}
      >
        {name[0]}
      </CustomAvatar>
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
