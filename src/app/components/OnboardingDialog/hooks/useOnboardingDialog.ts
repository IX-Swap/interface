import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { IdentityType } from 'app/pages/identity/utils'
import { useInvestRouter } from 'app/pages/invest/routers/router'
import { useSecurityRouter } from 'app/pages/security/router'
import { useSnackbar } from 'hooks/useSnackbar'

export const useOnboardingDialog = () => {
  const { showOnboardingDialog } = useSnackbar()
  const { paths: indentityPaths } = useIdentitiesRouter()
  const { paths: securityPaths } = useSecurityRouter()
  const { paths: investPaths } = useInvestRouter()

  const showEnable2FADialog = () => {
    showOnboardingDialog({
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
    showOnboardingDialog({
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
    showOnboardingDialog({
      title: `Create ${identityType} Identity`,
      message: [
        `In compliance with our KYC/AML process. Please create your ${identityType} identity.`
      ],
      closeLabel: 'Ok',
      closeArrow: true
    })
  }

  const showPostIdentityCreateDialog = (identityType: IdentityType) => {
    showOnboardingDialog({
      title: 'Identity Created!',
      message: [
        `Thank you for creating your ${identityType} identity. We will review your documents and notify your identity status.`
      ],
      closeLabel: 'Ok',
      closeArrow: true
    })
  }

  const showCreateDetailsOfIssuanceDialog = () => {
    showOnboardingDialog({
      title: 'Raise Capital Evaluation',
      message: [
        'Details of Issuance is collected so as to do a preliminary feasibility study about your deal'
      ],
      closeLabel: 'Let’s Proceed',
      closeArrow: true
    })
  }

  const showSubmitDetailsOfIssuanceDialog = () => {
    showOnboardingDialog({
      title: 'Thank You for the Interest! ',
      message: [
        'We will get back to you soon. Until then please explore our platform. We have exciting features waiting for you'
      ],
      closeLabel: 'OK Got It!',
      closeArrow: true
    })
  }

  const showOnboardingCompleteDialog = () => {
    showOnboardingDialog({
      title: 'Onboarding Complete!',
      message: [
        'You have completed the Onboarding journey. Our authorizer will review your identity and notify your status. You can start looking our deals in the “Invest” panel. Happy Investing!'
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
    showCreateDetailsOfIssuanceDialog,
    showSubmitDetailsOfIssuanceDialog,
    showOnboardingCompleteDialog
  }
}
