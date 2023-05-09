import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Typography } from '@mui/material'
import { CryptoHoldingContent } from './CrptoHoldingContent/CryptoHoldingContent'
import { CryptoHoldingAction } from './CryptoHoldingAction/CrptoHoldingAction'

export const CryptoHoldingDialog = () => {
  return (
    <Dialog
      button={
        <Typography
          component='span'
          color='primary'
          style={{ cursor: 'pointer' }}
          fontWeight={400}
        >
          cryptocurrency holding statement
        </Typography>
      }
      title='Cryptocurrency Holding Statement'
      content={<CryptoHoldingContent />}
      actions={<CryptoHoldingAction />}
      fullWidth
      scroll='body'
      maxWidth='md'
    />
  )
}
