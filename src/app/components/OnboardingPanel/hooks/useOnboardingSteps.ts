import { useAuth } from 'hooks/auth/useAuth'

const onboardingSteps = [
  { title: 'Get Started', content: ['Access platform and reports'] },
  { title: 'Select Your Desired Option', content: ['Create your account.'] },
  { title: 'Create Identity', content: ['For verification.'] },
  {
    title: 'Create DSO',
    content: [
      'Brows Live Deals',
      'Invest Deal',
      'Cash Deposit',
      'View History Transaction'
    ]
  },
  { title: 'Complete Onboarding', content: [] }
]

export const useOnboardingSteps = () => {
  const { user } = useAuth()

  const getActiveSteps = () => {
    let init = 0

    if (user === undefined) {
      return init
    }

    if (user?.totpConfirmed) {
      init++
    }

    return init
  }

  return {
    activeStep: getActiveSteps(),
    onboardingSteps: onboardingSteps
  }
}
