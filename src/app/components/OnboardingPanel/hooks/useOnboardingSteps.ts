import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { IdentityType } from 'app/pages/identity/utils'

export type IdentityStatus = 'Rejected' | 'Authorized' | 'Submitted' | 'Draft'

const getIdentityStatus = (status?: IdentityStatus) => {
  switch (status) {
    case 'Rejected':
      return ['Rejected']
    case 'Submitted':
      return ['For Verification']
    case 'Authorized':
      return ['Verified!']
    default:
      return ['In Progress']
  }
}

const defaultOnboardingSteps = [
  { title: 'Get Started', content: ['Access platform and reports'] },
  { title: 'Select Your Desired Option', content: ['Create your account.'] }
]

const getIdentityOnboardingSteps = (
  indentityType: IdentityType,
  status?: IdentityStatus
) => [
  defaultOnboardingSteps[0],
  {
    title: 'To Invest',
    content: [`As ${indentityType}`]
  },
  { title: 'Create Identity', content: getIdentityStatus(status) },
  { title: 'Complete Onboarding', content: [''] }
]

export const useOnboardingSteps = (identityType?: IdentityType) => {
  const {
    hasIdentity,
    identityLoaded,
    identityTypeLoaded,
    individualIdentity,
    corporateIdentities
  } = useGetIdentities()

  const getIdentityActiveStep = (status?: IdentityStatus) => {
    let initStep = 2
    if (status === 'Submitted') {
      initStep = 3
    }
    if ((status as IdentityStatus) === 'Authorized') {
      initStep = 4
    }
    return initStep
  }

  if (identityType === undefined && hasIdentity) {
    return {
      steps: getIdentityOnboardingSteps(
        identityTypeLoaded,
        identityLoaded?.status
      ),
      activeStep: getIdentityActiveStep(identityLoaded?.status)
    }
  }

  if (identityType === undefined) {
    return {
      steps: defaultOnboardingSteps,
      activeStep: 1
    }
  }

  const status =
    identityType === 'individual'
      ? individualIdentity?.status
      : corporateIdentities.list[0]?.status

  return {
    steps: getIdentityOnboardingSteps(identityType, status),
    activeStep: getIdentityActiveStep(status)
  }
}
