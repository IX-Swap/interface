import { Launch } from '@mui/icons-material'
import { Box } from '@mui/material'
import { AuthorizerIdentityLink } from 'app/components/AuthorizerIdentityLink'
import React from 'react'
import { OrderType, OTCIdentity, OTCOrder } from 'types/otcOrder'

export interface OrderTableLinkParams {
  userId: string
  identityId: string
  identityType: 'corporate' | 'individual'
  name: string
}
const getIdentityDetails = (
  userId: string,
  identity?: OTCIdentity
): OrderTableLinkParams => {
  if (identity === undefined) {
    return {
      userId,
      identityId: '',
      identityType: 'individual',
      name: ''
    }
  }
  const identityType: 'individual' | 'corporate' =
    identity.individual !== undefined ? 'individual' : 'corporate'
  const identityObject = identity?.[identityType]
  const name =
    identityType === 'individual'
      ? `${identityObject?.firstName ?? ''} ${
          identityObject?.middleName ?? ''
        } ${identityObject?.lastName ?? ''}`
      : identityObject?.companyLegalName ?? ''
  return {
    name,
    userId,
    identityType,
    identityId: identityObject?._id ?? ''
  }
}

// Get buyer or seller for each Order
export const renderParticipant = (
  item: OTCOrder,
  side: OrderType | 'Creator'
) => {
  const identityDetails = getIdentityDetails(item.user, item.identity)
  const matchDetails = getIdentityDetails(
    item.matches?.user ?? '',
    item?.matches?.identity
  )
  if (side === item.orderType || side === 'Creator') {
    return identityDetails
  }
  return matchDetails
}
export const renderIdentityLink = (
  item: OTCOrder,
  side: OrderType | 'Creator'
) => {
  const identityDetails = renderParticipant(item, side)
  return <OrderTableIdentityLink {...identityDetails} />
}
export const OrderTableIdentityLink = ({
  userId,
  identityId,
  identityType,
  name
}: OrderTableLinkParams) => {
  return (
    <AuthorizerIdentityLink
      identityId={identityId}
      type={identityType}
      userId={userId}
      underline='none'
      style={{ fontWeight: 400, fontSize: '14px', color: '#286396' }}
    >
      <Box display='flex' gap={1.25} alignItems='center'>
        <Box>{name}</Box>
        <Launch color='primary' />
      </Box>
    </AuthorizerIdentityLink>
  )
}
