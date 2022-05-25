import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@mui/material'
import { TaxDeclarationInfoContent } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoContent'
import { TaxDeclarationInfoAction } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoActions'

export const TaxDeclarationInfoDialog = () => {
  return (
    <Dialog
      fullWidth
      scroll='body'
      maxWidth='xs'
      button={
        <Typography
          component='span'
          color='primary'
          style={{ cursor: 'pointer' }}
        >
          Learn more
        </Typography>
      }
      title='Why we need your Tax Declaration?'
      content={<TaxDeclarationInfoContent />}
      actions={<TaxDeclarationInfoAction />}
    />
  )
}
