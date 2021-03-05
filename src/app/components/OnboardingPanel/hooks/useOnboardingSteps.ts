import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { IdentityType } from 'app/pages/identity/utils'

export type IdentityStatus = 'Rejected' | 'Authorized' | 'Submitted' | 'Draft'

export const getIdentityStatus = (status?: IdentityStatus) => {
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
        content: ['Issuance Detail ']
      }
    : {
        title: 'To Invest',
        content: [`As ${indentityType}`]
      },
  { title: 'Create Identity', content: getIdentityStatus(status) },
  { title: 'Complete Onboarding', content: [''] }
]

export const useOnboardingSteps = (
  identityType?: IdentityType,
  asIssuer = false
) => {
  const {
    hasIdentity,
    identityLoaded,
    identityTypeLoaded,
    individualIdentity,
    corporateIdentities
  } = useGetIdentities()

  const getIdentityActiveStep = (status?: IdentityStatus) => {
    let indetityActiveStep = 2
    if (status === 'Submitted') {
      indetityActiveStep = 3
    }
    if ((status as IdentityStatus) === 'Authorized') {
      indetityActiveStep = 4
    }
    return indetityActiveStep
  }

  const getIssuerActiveStep = (status?: IdentityStatus) => {
    let issuerActiveStep = 1
    // To do: get issuer details status
    const issueDetailsStatus = false
    if (issueDetailsStatus) {
      issuerActiveStep = getIdentityActiveStep(status)
    }

    return issuerActiveStep
  }

  const getActiveStep = (status?: IdentityStatus) => {
    if (asIssuer) {
      return getIssuerActiveStep(status)
    }
    return getIdentityActiveStep(status)
  }

  if (identityType === undefined && hasIdentity) {
    return {
      steps: getIdentityOnboardingSteps(
        identityTypeLoaded,
        identityLoaded?.status,
        asIssuer
      ),
      activeStep: getActiveStep(identityLoaded?.status)
    }
  }

  if (identityType === undefined) {
    return {
      steps: defaultOnboardingSteps,
      activeStep: 1
    }
  }

  const identityStatus =
    identityType === 'individual'
      ? individualIdentity?.status
      : corporateIdentities.list[0]?.status

  return {
    steps: getIdentityOnboardingSteps(identityType, identityStatus, asIssuer),
    activeStep: getActiveStep(identityStatus)
  }
}
