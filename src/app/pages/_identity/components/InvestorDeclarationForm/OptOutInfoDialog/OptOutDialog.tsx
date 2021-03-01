import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@material-ui/core'
import { OptOutInfoContent } from 'app/pages/_identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoContent/OptOutInfoContent'
import { OptOutInfoAction } from 'app/pages/_identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoAction/OptOutInfoAction'

export const OptOutInfoDialog = () => {
  return (
    <Dialog
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
      actions={<OptOutInfoAction onOptOut={() => console.log('opt out')} />}
      fullWidth
      scroll='body'
      maxWidth='md'
    />
  )
}
