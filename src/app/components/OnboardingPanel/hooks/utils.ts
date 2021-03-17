import { IdentityType } from 'app/pages/identity/utils'

export type IdentityStatus = 'Rejected' | 'Approved' | 'Submitted' | 'Draft'

export const getIdentityStatus = (status?: IdentityStatus) => {
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
  status?: IdentityStatus,
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
