import * as useOnboardingJourneys from 'app/hooks/onboarding/useOnboardingJourneys'
import { CorporateIssuerForm } from 'app/pages/identity/components/CorporateIssuerForm/CorporateIssuerForm'
import * as useAllCorporates from 'app/pages/identity/hooks/useAllCorporates'
import * as useCreateCorporate from 'app/pages/identity/hooks/useCreateCorporate'
import * as useSubmitCorporate from 'app/pages/identity/hooks/useSubmitCorporate'
import * as useUpdateCorporate from 'app/pages/identity/hooks/useUpdateCorporate'
import React from 'react'
import { corporate } from '__fixtures__/identity'
import {
  generateInfiniteQueryResult,
  generateMutationResult
} from '__fixtures__/useQuery'
import { history } from 'config/history'
import * as useConfirmSubmitDialog from 'app/pages/identity/hooks/useConfirmSubmitDialog'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateIssuerForm', () => {
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

  const useOnboardingJourneysResponse = {
    isCorporateJourneyCompleted: true,
    corporateIdentities: [{ ...corporate, type: 'issuer' }]
  }

  const closeDialog = jest.fn()
  const openDialog = jest.fn()
  const useConfirmSubmitDialogResponse = {
    open: false,
    closeDialog,
    openDialog
  }

  beforeEach(() => {
    history.push('/app/identity/corporates/create-issuer')

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
      .spyOn(useOnboardingJourneys, 'useOnboardingJourneys')
      .mockImplementation(() => useOnboardingJourneysResponse as any)

    jest
      .spyOn(useConfirmSubmitDialog, 'useConfirmSubmitDialog')
      .mockImplementation(() => useConfirmSubmitDialogResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })
})
