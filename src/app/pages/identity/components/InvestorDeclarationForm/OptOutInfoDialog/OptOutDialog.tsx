import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Typography } from '@mui/material'
import { OptOutInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoContent/OptOutInfoContent'
import { OptOutInfoAction } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoAction/OptOutInfoAction'

export const OptOutInfoDialog = ({ investorRole = 'Accredited' }) => {
  return (
    <Dialog
      keepMounted
      button={
        <Typography
          component='span'
          color='primary'
          style={{ cursor: 'pointer' }}
          fontWeight={400}
        >
          opt out
        </Typography>
      }
      title={`${investorRole} Investor Opt-Out Form`}
      content={<OptOutInfoContent investorRole={investorRole} />}
      actions={<OptOutInfoAction />}
      fullWidth
      scroll='body'
      maxWidth='md'
    />
  )
}
