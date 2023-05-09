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
          style={{ cursor: 'pointer' }}
          fontWeight={400}
        >
          safeguards
        </Typography>
      }
      title='Disclosures'
      content={<SafeguardInfoContent />}
      actions={<SafeguardInfoAction />}
      fullWidth
      scroll='body'
      maxWidth='md'
    />
  )
}
