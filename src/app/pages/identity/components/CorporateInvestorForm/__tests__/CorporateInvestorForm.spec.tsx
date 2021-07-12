import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateInvestorForm } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import {
  generateInfiniteQueryResult,
  generateMutationResult
} from '__fixtures__/useQuery'
import { corporate } from '__fixtures__/identity'
import * as useAllCorporates from 'app/pages/identity/hooks/useAllCorporates'
import * as useCreateCorporate from 'app/pages/identity/hooks/useCreateCorporate'
import * as useUpdateCorporate from 'app/pages/identity/hooks/useUpdateCorporate'
import * as useSubmitCorporate from 'app/pages/identity/hooks/useSubmitCorporate'
import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateInvestorForm', () => {
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
    isInvestorJourneyCompleted: true,
    investorIdentities: [corporate]
  }

  beforeEach(() => {
    history.push('/app/identity/corporateIdentity/create')

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
    render(<CorporateInvestorForm data={corporate} />)
  })

  it('invokes showPreIdentityCreateDialog when data undefined', () => {
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

  it('redirects path to editCorporate when identity exists', () => {
    history.push(IdentityRoute.createCorporate)
    render(<CorporateInvestorForm />)

    expect(history.location.pathname).toEqual(
      generatePath(IdentityRoute.editCorporate, {
        identityId: corporate._id,
        userId: corporate.user._id
      })
    )
  })
})
