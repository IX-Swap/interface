import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@material-ui/core'
import { TaxDeclarationInfoContent } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoContent'
import { TaxDeclarationInfoAction } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoActions'

export const TaxDeclarationInfoDialog = () => {
  return (
    <Dialog
      fullWidth
      scroll='body'
      maxWidth='md'
      button={
        <Typography
          component='span'
          color='primary'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Click here
        </Typography>
      }
      title='Why we need your Tax Declaration?'
      content={<TaxDeclarationInfoContent />}
      actions={<TaxDeclarationInfoAction />}
    />
  )
}
