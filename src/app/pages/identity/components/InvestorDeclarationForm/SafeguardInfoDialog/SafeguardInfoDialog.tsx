import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Typography } from '@mui/material'
import { SafeguardInfoAction } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoAction/SafeguardInfoAction'
import { SafeguardInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoContent/SafeguardInfoContent'

export const SafeguardInfoDialog = () => {
  return (
    <Dialog
      button={
        <Typography
          component='span'
          color='primary'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          safeguards
        </Typography>
      }
      title='Accredited Investors and Their Special Treatment'
      content={<SafeguardInfoContent />}
      actions={<SafeguardInfoAction />}
      fullWidth
      scroll='body'
      maxWidth='md'
    />
  )
}
