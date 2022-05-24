import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { useSnackbar } from 'hooks/useSnackbar'
import { useIsAdmin } from 'helpers/acl'

export const useOnboardingDialog = () => {
  const { showOnboardingDialog } = useSnackbar()
  const { getIsJourneyCompleted } = useOnboardingJourneys()
  const isAdmin = useIsAdmin()

  const showCreateAccountDialog = () => {
    !isAdmin &&
      showOnboardingDialog({
        title: 'Create an Identity',
        message: ['To manage your account please create your identity first'],
        closeLabel: 'Proceed Now'
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

  return {
    showCreateAccountDialog,
    showPreIdentityCreateDialog,
    showCreateDetailsOfIssuanceDialog,
    showSubmitDetailsOfIssuanceDialog
  }
}
