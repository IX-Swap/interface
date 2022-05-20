import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@mui/material'
import { OptOutInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoContent/OptOutInfoContent'
import { OptOutInfoAction } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoAction/OptOutInfoAction'

export const OptOutInfoDialog = () => {
  return (
    <Dialog
      keepMounted
      button={
        <Typography
          component='span'
          color='primary'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          opt out
        </Typography>
      }
      title='Accredited Investor Opt-Out Form'
      content={<OptOutInfoContent />}
      actions={<OptOutInfoAction />}
      fullWidth
      scroll='body'
      maxWidth='sm'
    />
  )
}
