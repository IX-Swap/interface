import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@mui/material'
import { TaxDeclarationInfoAction } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfoDialog/TaxDeclarationInfoActions'
import { FatcaContent } from 'app/pages/identity/components/TaxDeclarationForm/FatcaDialog/FatcaContent'

export const FatcaDialog = () => {
  return (
    <Dialog
      fullWidth
      scroll='body'
      button={
        <Typography
          component='span'
          color='primary'
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 'inherit'
          }}
        >
          FATCA
        </Typography>
      }
      title='Under FATCA, you are a citizen of the United States of America if:'
      content={<FatcaContent />}
      actions={<TaxDeclarationInfoAction />}
    />
  )
}
