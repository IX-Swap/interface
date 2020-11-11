import React from 'react'
import { Dialog } from 'v2/app/pages/identity/components/Dialog'
import { Typography } from '@material-ui/core'
import { TermsOfUseContent } from 'v2/app/components/TermsOfUseContent'

export const TermsOfUse = () => {
  return (
    <Dialog
      fullWidth
      scroll='body'
      button={
        <Typography
          component='span'
          color='primary'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Terms Of Use
        </Typography>
      }
      title='IX Terms and Conditions'
      content={<TermsOfUseContent />}
    />
  )
}
