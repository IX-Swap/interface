import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'
import {
  generateInfiniteQueryResult,
  generateMutationResult
} from '__fixtures__/useQuery'
import { corporate } from '__fixtures__/identity'
import * as useAllCorporates from 'app/pages/_identity/hooks/useAllCorporates'
import * as useIdentitiesRouter from 'app/pages/_identity/router'
import * as useCreateCorporate from 'app/pages/_identity/hooks/useCreateCorporate'
import * as useUpdateCorporate from 'app/pages/_identity/hooks/useUpdateCorporate'
import * as useSubmitCorporate from 'app/pages/_identity/hooks/useSubmitCorporate'
import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateInvestorForm', () => {
  const useIdentitiesRouterResponse = {
    params: { userId: corporate._id },
    paths: { createCorporate: '/corporate/path' },
    current: { path: '/corporate/path' }
  }
  const useAllCorporatesResponse = generateInfiniteQueryResult({
    map: {
      [corporate._id]: corporate
    },
    list: [corporate],
    isLoading: false
  })
  const mutateFn = jest.fn()
  const mutationResult = generateMutationResult({
    data: corporate,
    isLoading: false
  })
  const useCreateCorporateResponse = [mutateFn, mutationResult]
  const useUpdateCorporateResponse = [mutateFn, mutationResult]
  const useSubmitCorporateResponse = [mutateFn, mutationResult]

  const showPreIdentityCreateDialogMock = jest.fn()
  const useOnboardingDialogResponse = {
    showPreIdentityCreateDialog: showPreIdentityCreateDialogMock
  }

  const useOnboardingJourneysResponse = {
    isInvestorJourneyCompleted: true
  }

  beforeEach(() => {
    jest
      .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
      .mockImplementation(() => useIdentitiesRouterResponse as any)

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesResponse as any)

    jest
      .spyOn(useCreateCorporate, 'useCreateCorporate')
      .mockImplementation(() => useCreateCorporateResponse as any)

    jest
      .spyOn(useUpdateCorporate, 'useUpdateCorporate')
      .mockImplementation(() => useUpdateCorporateResponse as any)

    jest
      .spyOn(useSubmitCorporate, 'useSubmitCorporate')
      .mockImplementation(() => useSubmitCorporateResponse as any)

    jest
      .spyOn(useOnboardingDialog, 'useOnboardingDialog')
      .mockImplementation(() => useOnboardingDialogResponse as any)

    jest
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CorporateInvestorForm />)
  })

  it('renders loading text when isLoading', () => {
    const useAllCorporatesLoadingResponse = generateInfiniteQueryResult({
      map: {
        [corporate._id]: corporate
      },
      list: [corporate],
      isLoading: true
    })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesLoadingResponse as any)

    const { getByText } = render(<CorporateInvestorForm />)
    expect(getByText('Loading...')).toBeTruthy()
  })

  it('invokes showPreIdentityCreateDialog when data list length is 0', () => {
    const useAllCorporatesZeroResponse = generateInfiniteQueryResult({
      map: {
        [corporate._id]: corporate
      },
      list: [],
      isLoading: false
    })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesZeroResponse as any)

    render(<CorporateInvestorForm />)
    expect(showPreIdentityCreateDialogMock).toHaveBeenCalled()
  })
})
