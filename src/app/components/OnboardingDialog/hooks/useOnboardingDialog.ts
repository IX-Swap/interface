import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { SecurityRoute } from 'app/pages/security/router/config'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { useSnackbar } from 'hooks/useSnackbar'
import { useIsAdmin } from 'helpers/acl'

export const useOnboardingDialog = () => {
  const { showOnboardingDialog } = useSnackbar()
  const { getIsJourneyCompleted } = useOnboardingJourneys()
  const isAdmin = useIsAdmin()

  const showEnable2FADialog = () => {
    !isAdmin &&
      showOnboardingDialog({
        title: 'Secure Your Account!',
        message: [
          'Increase your account security by enabling two factor authentication when signing into platform'
        ],
        action: SecurityRoute.setup2fa,
        actionLabel: 'Enable 2FA',
        closeLabel: 'Skip',
        closeArrow: false
      })
  }

  const showCreateAccountDialog = () => {
    !isAdmin &&
      showOnboardingDialog({
        title: 'Create an Identity',
        message: [
          'Please create your identity first before you can manage your Accounts.'
        ],
        closeLabel: 'Okay'
      })
  }

  const showPreIdentityCreateDialog = (identityType: IdentityType) => {
    if (!getIsJourneyCompleted(identityType)) {
      !isAdmin &&
        showOnboardingDialog({
          title: `Create ${identityType} Identity`,
          message: [
            `In compliance with our KYC/AML process. Please create your ${identityType} identity.`
          ],
          closeLabel: 'Okay',
          closeArrow: true
        })
    }
  }

  const showPostIdentityCreateDialog = (identityType: IdentityType) => {
    if (!getIsJourneyCompleted(identityType)) {
      !isAdmin &&
        showOnboardingDialog({
          title: 'Identity Created!',
          message: [
            `Thank you for creating your ${identityType} identity. We will review your documents and notify your identity status.`
          ],
          closeLabel: 'Ok',
          closeArrow: true
        })
    }
  }

  const showCreateDetailsOfIssuanceDialog = () => {
    !isAdmin &&
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
    !isAdmin &&
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
    !isAdmin &&
      showOnboardingDialog({
        title: 'Onboarding Complete!',
        message: [
          'You have complete the Onboarding journey. Our authorizer has approved your identity. You can start looking our deals in the “Invest” panel. Happy Investing!'
        ],
        actionLabel: 'Start Investing',
        action: ''
        // action: investPaths.landing
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
