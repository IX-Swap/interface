import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Typography } from '@mui/material'
import { InstitutionalInvestorInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorInfoDialog/InstitutionalInvestorInfoContent/InstitutionalInvestorInfoContent'
import { InstitutionalInvestorInfoAction } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorInfoDialog/InstitutionalInvestorInfoAction/InstitutionalInvestorInfoAction'

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
      content={<InstitutionalInvestorInfoContent />}
      actions={<InstitutionalInvestorInfoAction />}
      fullWidth
      scroll='body'
      maxWidth='xl'
    />
  )
}
