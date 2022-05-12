import { Box, Button, ButtonProps } from '@mui/material'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'

export interface ConfirmOTCOrderButtonProps extends ButtonProps {
  order: OTCOrder
}
export const ConfirmOTCOrderButton = ({
  order,
  ...rest
}: ConfirmOTCOrderButtonProps) => {
  const handleClick = async () => {
    console.log('confirm!!!')
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Button
        // disabled={status === 'loading'}
        disabled={false}
        onClick={handleClick}
        variant='text'
        color='primary'
        size='small'
        {...rest}
      >
        Confirm
      </Button>
    </Box>
  )
}
