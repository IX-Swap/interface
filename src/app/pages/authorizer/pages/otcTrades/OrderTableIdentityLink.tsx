import { Launch } from '@mui/icons-material'
import { Box } from '@mui/material'
import { AuthorizerIdentityLink } from 'app/components/AuthorizerIdentityLink'
import React from 'react'

export const OrderTableIdentityLink = ({ user }: { user: any }) => {
  return (
    <AuthorizerIdentityLink
      identityId={user.identityId}
      type={user.identityType}
      userId={user.userId}
      underline='none'
      style={{ fontWeight: 400, fontSize: '14px', color: '#286396' }}
    >
      <Box display='flex' gap={1.25} alignItems='center'>
        <Box>{user.name}</Box>
        <Launch color='primary' />
      </Box>
    </AuthorizerIdentityLink>
  )
}
