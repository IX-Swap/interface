import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Typography } from '@mui/material'
import { IntermediaryInvestorInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/IntermediaryInvestorInfoDialog/IntermediaryInvestorInfoContent/IntermediaryInvestorInfoContent'
import { IntermediaryInvestorInfoAction } from 'app/pages/identity/components/InvestorDeclarationForm/IntermediaryInvestorInfoDialog/IntermediaryInvestorInfoAction/IntermediaryInvestorInfoAction'

export const IntermediaryInvestorInfoDialog = () => {
  return (
    <Dialog
      keepMounted
      button={
        <Typography
          component='span'
          color='primary'
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          Intermediary Investor
        </Typography>
      }
      title='Intermediary Investor'
      content={<IntermediaryInvestorInfoContent />}
      actions={<IntermediaryInvestorInfoAction />}
      fullWidth
      scroll='body'
      maxWidth='md'
    />
  )
}
