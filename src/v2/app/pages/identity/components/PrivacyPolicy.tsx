import React from 'react'
import { Dialog } from 'v2/app/pages/identity/components/Dialog'
import { Typography } from '@material-ui/core'
import { PrivacyPolicyContent } from 'v2/app/components/PrivacyPolicyContent'

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
