import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Avatar } from 'components/Avatar'
import { useAuth } from 'hooks/auth/useAuth'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { UserRoleStatus } from 'app/components/UserDropdown/UserRoleStatus'

export const UserDropdownInfo = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const { data } = useIndividualIdentity()

  if (user === undefined) {
    return null
  }

  const { email, name } = user

  return (
    <Box
      display='flex'
      alignItems='center'
      bgcolor={
        theme.palette.mode === 'light'
          ? theme.palette.backgrounds.light
          : theme.palette.backgrounds.lighter
      }
      px={2}
      py={1.5}
      borderRadius='4px 4px 0 0'
    >
      <Avatar size={42} documentId={data?.photo} ownerId={user._id}>
        {name[0]}
      </Avatar>
      <Box px={1.4}>
        <Typography variant='subtitle1'>{name}</Typography>
        <Typography color='textSecondary'>{email}</Typography>
        <UserRoleStatus />
      </Box>
    </Box>
  )
}
