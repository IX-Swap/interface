import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@material-ui/core'
import { TermsOfUseContent } from 'app/components/TermsOfUseContent'

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
