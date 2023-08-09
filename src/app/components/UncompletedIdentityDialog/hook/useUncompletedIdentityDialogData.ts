import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'

export const useUncompletedIdentityDialogData = () => {
  const {
    isIdentitiesLoaded,
    individualIdentity,
    corporateIdentities,
    isCorporateJourneyStarted,
    isIndividualJourneyStarted
  } = useOnboardingJourneys()

  const getRedirectPath = () => {
    if (isIdentitiesLoaded && individualIdentity !== undefined) {
      return `/app/profile/individualIdentity/${individualIdentity?.user._id}/${individualIdentity?._id}/edit`
    }

    if (
      isIdentitiesLoaded &&
      corporateIdentities !== undefined &&
      corporateIdentities.length > 0 &&
      corporateIdentities[0].type === 'investor'
    ) {
      return `/app/profile/corporates/${corporateIdentities[0].user._id}/${corporateIdentities[0]._id}/edit`
    }

    if (
      isIdentitiesLoaded &&
      corporateIdentities !== undefined &&
      corporateIdentities.length > 0 &&
      corporateIdentities[0].type === 'issuer'
    ) {
      return `/app/profile/corporates/${corporateIdentities[0].user._id}/${corporateIdentities[0]._id}/edit-issuer`
    }

    // return '/'
    return '/app/profile'
  }

  const createIdentityInfo = () => {
    return {
      title: 'Create an Identity',
      message: 'To manage your account please create your identity first',
      actionLabel: 'Proceed Now',
      action: getRedirectPath()
    }
  }

  const finishIdentityInfo = () => {
    return {
      title: 'Finish your Identity creation',
      message: 'To manage your account please finish your identity first',
      actionLabel: 'Proceed Now',
      action: getRedirectPath()
    }
  }

  const waitAuthorizerInfo = () => {
    return {
      title: 'Wait for Authorizer’s Approval',
      message:
        'To manage your account please wait for Authorizer’s approval of your identity first',
      actionLabel: 'OK',
      action: null
    }
  }

  const getData = () => {
    if (isIdentitiesLoaded) {
      if (!isIndividualJourneyStarted && !isCorporateJourneyStarted) {
        return createIdentityInfo()
      }
      if (
        individualIdentity?.status === 'Submitted' ||
        corporateIdentities.some(item => item.status === 'Submitted')
      ) {
        return waitAuthorizerInfo()
      }

      return finishIdentityInfo()
    }

    return undefined
  }

  return {
    data: getData(),
    isLoading: !isIdentitiesLoaded
  }
}
