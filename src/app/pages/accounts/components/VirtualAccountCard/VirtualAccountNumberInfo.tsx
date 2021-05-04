import { Box, Typography } from '@material-ui/core'
import { ValidCurrency } from 'helpers/types'
import React from 'react'

export interface VirtualAccountNumberInfoProps {
  accountNumber: string
  currency: ValidCurrency
}

export interface AccountNumberSectionProps {
  numberSegment: string
}
export const AccountNumberSection = ({
  numberSegment
}: AccountNumberSectionProps) => {
  return (
    <Typography style={{ fontSize: 22, color: '#fff', fontWeight: 500 }}>
      {numberSegment}
    </Typography>
  )
}

export const VirtualAccountNumberInfo = ({
  accountNumber,
  currency
}: VirtualAccountNumberInfoProps) => {
  const accountNumberSegments = accountNumber.match(/.{1,4}/g)
  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        {accountNumberSegments?.map(number => (
          <AccountNumberSection numberSegment={number} />
        ))}
      </Box>
      <Box>
        <Typography style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>
          {currency}
        </Typography>
      </Box>
    </>
  )
}
