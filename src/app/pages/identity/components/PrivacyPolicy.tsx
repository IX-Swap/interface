import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog'
import { Typography } from '@material-ui/core'
import { PrivacyPolicyContent } from 'app/components/PrivacyPolicyContent'

export const PrivacyPolicy = () => {
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
          Privacy Policy
        </Typography>
      }
      title='PRIVACY AND DATA PROTECTION POLICY'
      content={<PrivacyPolicyContent />}
    />
  )
}
