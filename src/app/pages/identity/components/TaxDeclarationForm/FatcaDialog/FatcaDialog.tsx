import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Typography } from '@mui/material'
import { TaxDeclarationInfoAction } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfoDialog/TaxDeclarationInfoActions'
import { FatcaContent } from 'app/pages/identity/components/TaxDeclarationForm/FatcaDialog/FatcaContent'

export const FatcaDialog = () => {
  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      scroll='body'
      button={
        <Typography
          component='span'
          color='primary'
          style={{
            cursor: 'pointer'
          }}
        >
          Learn More
        </Typography>
      }
      title='Under FATCA, You are Citizen Of The United States Of America if:'
      titleStyle={{ marginTop: 20 }}
      content={<FatcaContent />}
      actions={<TaxDeclarationInfoAction label='OK' />}
    />
  )
}
