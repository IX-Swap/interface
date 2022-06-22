import { renderHook } from '@testing-library/react-hooks'
import { useUncompletedIdentityDialogData } from 'app/components/UncompletedIdentityDialog/hook/useUncompletedIdentityDialogData'
import * as useOnboardingJourneys from 'app/hooks/onboarding/useOnboardingJourneys'
import { corporate, individual } from '__fixtures__/identity'

describe('useUncompletedIdentityDialogData', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct values if isIdentitiesLoaded is false', () => {
    const useOnboardingJourneysResponse = {
      isIdentitiesLoaded: false
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    const {
      result: { current }
    } = renderHook(() => useUncompletedIdentityDialogData())

    expect(current.data).toEqual(undefined)
    expect(current.isLoading).toEqual(true)
  })

  it('returns correct values if creating identity not started yet', () => {
    const useOnboardingJourneysResponse = {
      isIdentitiesLoaded: true,
      isIndividualJourneyStarted: false,
      isCorporateJourneyStarted: false
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    const {
      result: { current }
    } = renderHook(() => useUncompletedIdentityDialogData())

    expect(current.isLoading).toEqual(false)
    expect(current.data).toEqual({
      title: 'Create an Identity',
      message: 'To manage your account please create your identity first',
      actionLabel: 'Proceed Now',
      action: '/'
    })
  })

  it('return correct values when user started creating corporateIdentity', () => {
    const useOnboardingJourneysResponse = {
      isIdentitiesLoaded: true,
      isCorporateJourneyStarted: true,
      corporateIdentities: [{ ...corporate, status: '' }]
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    const {
      result: { current }
    } = renderHook(() => useUncompletedIdentityDialogData())

    expect(current.isLoading).toEqual(false)
    expect(current.data).toEqual({
      title: 'Finish your Identity creation',
      message: 'To manage your account please finish your identity first',
      actionLabel: 'Proceed Now',
      action: `/app/identity/corporates/${corporate.user._id}/${corporate._id}/edit`
    })
  })

  it('return correct values when user started creating corporateIdentity as issuer', () => {
    const useOnboardingJourneysResponse = {
      isIdentitiesLoaded: true,
      isCorporateJourneyStarted: true,
      corporateIdentities: [{ ...corporate, status: '', type: 'issuer' }]
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    const {
      result: { current }
    } = renderHook(() => useUncompletedIdentityDialogData())

    expect(current.isLoading).toEqual(false)
    expect(current.data).toEqual({
      title: 'Finish your Identity creation',
      message: 'To manage your account please finish your identity first',
      actionLabel: 'Proceed Now',
      action: `/app/identity/corporates/${corporate.user._id}/${corporate._id}/edit-issuer`
    })
  })

  it('return correct values when user started creating individualIdentity', () => {
    const useOnboardingJourneysResponse = {
      isIdentitiesLoaded: true,
      isIndividualJourneyStarted: true,
      individualIdentity: { ...individual, status: '' },
      corporateIdentities: []
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    const {
      result: { current }
    } = renderHook(() => useUncompletedIdentityDialogData())

    expect(current.isLoading).toEqual(false)
    expect(current.data).toEqual({
      title: 'Finish your Identity creation',
      message: 'To manage your account please finish your identity first',
      actionLabel: 'Proceed Now',
      action: `/app/identity/individualIdentity/${corporate.user._id}/${corporate._id}/edit`
    })
  })

  it('return correct values when user has corporateIdentity with Submitted status', () => {
    const useOnboardingJourneysResponse = {
      isIdentitiesLoaded: true,
      isCorporateJourneyStarted: true,
      corporateIdentities: [{ ...corporate }]
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    const {
      result: { current }
    } = renderHook(() => useUncompletedIdentityDialogData())

    expect(current.isLoading).toEqual(false)
    expect(current.data).toEqual({
      title: 'Wait for Authorizer’s Approval',
      message:
        'To manage your account please wait for Authorizer’s approval of your identity first',
      actionLabel: 'OK',
      action: null
    })
  })

  it('return correct values when user has individualIdentity with Submitted status', () => {
    const useOnboardingJourneysResponse = {
      isIdentitiesLoaded: true,
      isIndividualJourneyStarted: true,
      individualIdentity: { ...individual },
      corporateIdentities: []
    }

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    const {
      result: { current }
    } = renderHook(() => useUncompletedIdentityDialogData())

    expect(current.isLoading).toEqual(false)
    expect(current.data).toEqual({
      title: 'Wait for Authorizer’s Approval',
      message:
        'To manage your account please wait for Authorizer’s approval of your identity first',
      actionLabel: 'OK',
      action: null
    })
  })
})
