import { AuthorizableStatus } from 'types/util'
import { IdentityType } from 'app/pages/identity/utils/shared'

export const getIdentityStatus = (status?: AuthorizableStatus) => {
  switch (status) {
    case 'Rejected':
      return ['Rejected']
    case 'Submitted':
      return ['For Verification']
    case 'Approved':
      return ['Verified!']
    case 'Draft':
      return ['In Progress']
    default:
      return ['']
  }
}

export const defaultOnboardingSteps = [
  { title: 'Get Started', content: ['Access platform and reports'] },
  { title: 'Select Your Desired Option', content: ['Create your account.'] }
]

interface IdentityOnboardingSteps {
  identityType: IdentityType
  identityStatus?: AuthorizableStatus
  asIssuer?: boolean
  issuanceDetailsStatus?: AuthorizableStatus
}

export const getIdentityOnboardingSteps = ({
  identityType,
  identityStatus,
  asIssuer,
  issuanceDetailsStatus
}: IdentityOnboardingSteps) => [
  defaultOnboardingSteps[0],
  asIssuer === true
    ? {
        title: 'To Raise Capital',
        content:
          issuanceDetailsStatus !== undefined
            ? getIdentityStatus(issuanceDetailsStatus)
            : ['Issuance Detail']
      }
    : {
        title: 'To Invest',
        content: [`As ${identityType}`]
      },
  { title: 'Create Identity', content: getIdentityStatus(identityStatus) },
  { title: 'Complete Onboarding', content: [''] }
]
