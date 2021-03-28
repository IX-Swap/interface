import { IdentityType } from 'app/pages/identity/utils'
import { AuthorizableStatus } from 'types/util'

export const getIdentityStatus = (status?: AuthorizableStatus) => {
  switch (status) {
    case 'Rejected':
      return ['Rejected']
    case 'Submitted':
      return ['For Verification']
    case 'Approved':
      return ['Verified!']
    default:
      return ['In Progress']
  }
}

export const defaultOnboardingSteps = [
  { title: 'Get Started', content: ['Access platform and reports'] },
  { title: 'Select Your Desired Option', content: ['Create your account.'] }
]

export const getIdentityOnboardingSteps = (
  indentityType: IdentityType,
  status?: AuthorizableStatus,
  asIssuer?: boolean
) => [
  defaultOnboardingSteps[0],
  asIssuer === true
    ? {
        title: 'To Raise Capital',
        content: ['']
      }
    : {
        title: 'To Invest',
        content: [`As ${indentityType}`]
      },
  { title: 'Create Identity', content: getIdentityStatus(status) },
  { title: 'Complete Onboarding', content: [''] }
]
