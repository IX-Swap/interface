import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Typography } from '@mui/material'
import { OptOutInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoContent/OptOutInfoContent'
import { OptOutInfoAction } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoAction/OptOutInfoAction'

export const InstitutionalInvestorInfoDialog = () => {
  return (
    <Dialog
      keepMounted
      button={
        <Typography
          component='span'
          color='primary'
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          Institutional Investor
        </Typography>
      }
      title='Institutional Investor Means'
      // TODO Need to create new content and actions components
      content={<OptOutInfoContent />}
      actions={<OptOutInfoAction />}
      fullWidth
      scroll='body'
      maxWidth='sm'
    />
  )
}
