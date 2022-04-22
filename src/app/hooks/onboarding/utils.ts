import { AuthorizableStatus } from 'types/util'
import { IdentityType } from 'app/pages/identity/utils/shared'

export const getIdentityStatus = (status?: AuthorizableStatus | 'Skipped') => {
  switch (status) {
    case 'Rejected':
      return ['Rejected']
    case 'Submitted':
      return ['For verification']
    case 'Approved':
      return ['Verified!']
    case 'Draft':
      return ['In progress']
    case 'Skipped':
      return ['Skipped']
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
  identityStatus?: AuthorizableStatus | 'Skipped'
  asIssuer?: boolean
  issuanceDetailsStatus?: AuthorizableStatus | 'Skipped'
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
            : ['Issuance detail']
      }
    : {
        title: 'To Invest',
        content: [`As ${identityType.toLowerCase()}`]
      },
  { title: 'Create Identity', content: getIdentityStatus(identityStatus) },
  { title: 'Complete Onboarding', content: [''] }
]
