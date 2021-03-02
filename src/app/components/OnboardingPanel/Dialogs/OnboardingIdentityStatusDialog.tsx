import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import { useInvestRouter } from 'app/pages/invest/routers/router'

export interface OnboardingIdentityStatusDialogProps {
  status: 'Submitted' | 'Rejected' | 'Draft' | 'Authorized'
  identityType: 'individual' | 'corporate'
}

export const OnboardingIdentityStatusDialog = ({
  status,
  identityType
}: OnboardingIdentityStatusDialogProps) => {
  const { paths: investPaths } = useInvestRouter()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  }, [status])

  const handleClose = () => {
    setOpen(false)
  }

  const getContent = () => {
    switch (status) {
      // case 'Draft':
      //   return {
      //     message: `In compliance with our KYC/AML process. Please create your ${identityType} identity.`,
      //     title: `Create ${identityType} Identity`,
      //     closeLabel: 'Ok'
      //   }
      case 'Submitted':
        return {
          message: `Thank you for creating your ${identityType} identity. We will review your documents and notify your identity status.`,
          title: 'Identity Created!',
          closeLabel: 'Ok'
        }
      case 'Authorized':
        return {
          message:
            'You have complete the Onboarding journey. Our authorizer will review your identity and notify your status. You can start looking our deals in the “Invest” panel. Happy Investing!',
          title: 'Onboarding Complete!',
          actionLabel: 'Start Investing',
          action: investPaths.landing
        }
      default:
        return {
          message: '',
          title: ''
        }
    }
  }

  return getContent().title !== '' ? (
    <OnboardingDialog
      initOpened={false}
      title={getContent().title}
      closeLabel={getContent().closeLabel ?? undefined}
      action={getContent().action ?? undefined}
      actionLabel={getContent().actionLabel ?? undefined}
      closeAction={handleClose}
      closeArrow={true}
      openDialog={open}
    >
      <Typography>{getContent().message}</Typography>
    </OnboardingDialog>
  ) : null
}
