import { useOnboardingDialogActions } from 'app/components/OnboardingDialog/useOnboardingDialogState'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { IdentityType } from 'app/pages/identity/utils'
import { useInvestRouter } from 'app/pages/invest/routers/router'
import { useSecurityRouter } from 'app/pages/security/router'

export const useOnboardingDialog = () => {
  const { setOnboardingNotification } = useOnboardingDialogActions()
  const { paths: indentityPaths } = useIdentitiesRouter()
  const { paths: securityPaths } = useSecurityRouter()
  const { paths: investPaths } = useInvestRouter()

  const showEnable2FADialog = () => {
    setOnboardingNotification({
      title: 'Secure Your Account!',
      message: [
        'Increase your account security by enabling two factor authentication when signing into platform'
      ],
      action: securityPaths.setup2fa,
      actionLabel: 'Enable 2FA',
      closeLabel: 'Skip',
      closeArrow: false
    })
  }

  const showCreateAccountDialog = () => {
    setOnboardingNotification({
      title: 'Create an Identity',
      message: [
        'Please create your identity first before you can manage your Accounts.'
      ],
      action: indentityPaths.createIndividual,
      actionLabel: 'Create Account',
      closeLabel: 'Close',
      closeArrow: false
    })
  }

  const showPreIdentityCreateDialog = (identityType: IdentityType) => {
    setOnboardingNotification({
      title: `Create ${identityType} Identity`,
      message: [
        `In compliance with our KYC/AML process. Please create your ${identityType} identity.`
      ],
      closeLabel: 'Ok',
      closeArrow: true
    })
  }

  const showPostIdentityCreateDialog = (identityType: IdentityType) => {
    setOnboardingNotification({
      title: 'Identity Created!',
      message: [
        `Thank you for creating your ${identityType} identity. We will review your documents and notify your identity status.`
      ],
      closeLabel: 'Ok',
      closeArrow: true
    })
  }

  const showOnboardingCompleteDialog = () => {
    setOnboardingNotification({
      title: 'Onboarding Complete!',
      message: [
        'You have complete the Onboarding journey. Our authorizer will review your identity and notify your status. You can start looking our deals in the “Invest” panel. Happy Investing!'
      ],
      actionLabel: 'Start Investing',
      action: investPaths.landing
    })
  }

  return {
    showEnable2FADialog,
    showCreateAccountDialog,
    showPreIdentityCreateDialog,
    showPostIdentityCreateDialog,
    showOnboardingCompleteDialog
  }
}
