import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import * as useOnboardingJourneys from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { IndividualInvestorForm } from 'app/pages/identity/components/IndividualInvestorForm/IndividualInvestorForm'
import * as useCreateIndividual from 'app/pages/identity/hooks/useCreateIndividual'
import * as useSubmitIndividual from 'app/pages/identity/hooks/useSubmitIndividual'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'
import {
  generateMutationResult,
  generateQueryResult
} from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualInvestorForm', () => {
  const useIndividualIdentityResponse = generateQueryResult({
    data: individual,
    isLoading: false
  })

  const mutationFn = jest.fn()
  const useCreateIndividualResponse = [mutationFn, generateMutationResult({})]
  const useSubmitIndividualResponse = [mutationFn, generateMutationResult({})]

  const showPreIdentityCreateDialogFn = jest.fn()
  const useOnboardingDialogResponse = {
    showPreIdentityCreateDialog: showPreIdentityCreateDialogFn
  }
  const useOnboardingJourneysResponse = { isIndividualJourneyCompleted: true }

  beforeEach(() => {
    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)

    jest
      .spyOn(useCreateIndividual, 'useCreateIndividual')
      .mockImplementation(() => useCreateIndividualResponse as any)

    jest
      .spyOn(useSubmitIndividual, 'useSubmitIndividual')
      .mockImplementation(() => useSubmitIndividualResponse as any)

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
    render(<IndividualInvestorForm />)
  })

  it('renders loading text when isLoading', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: individual,
      isLoading: true
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)

    const { getByText } = render(<IndividualInvestorForm />)

    expect(getByText('Loading...')).toBeTruthy()
  })

  it('invokes showPreIdentityCreateDialog when data id undefined', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)

    render(<IndividualInvestorForm />)

    expect(showPreIdentityCreateDialogFn).toHaveBeenCalled()
  })
})
