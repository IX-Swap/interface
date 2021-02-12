import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@material-ui/core'
import { TaxDeclarationInfoAction } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoActions'
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
            fontWeight: 'bold'
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
