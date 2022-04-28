import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import * as useOnboardingJourneys from 'app/hooks/onboarding/useOnboardingJourneys'
import { IndividualInvestorForm } from 'app/pages/identity/components/IndividualInvestorForm/IndividualInvestorForm'
import * as useCreateIndividual from 'app/pages/identity/hooks/useCreateIndividual'
import * as useSubmitIndividual from 'app/pages/identity/hooks/useSubmitIndividual'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { history } from 'config/history'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { generatePath } from 'react-router-dom'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'
import {
  generateMutationResult,
  generateQueryResult
} from '__fixtures__/useQuery'
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import * as useConfirmSubmitDialog from 'app/pages/identity/hooks/useConfirmSubmitDialog'

window.URL.revokeObjectURL = jest.fn()

jest.mock(
  'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog',
  () => ({
    IdentitySubmitConfirmationDialog: jest.fn(() => null)
  })
)

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

  const closeDialog = jest.fn()
  const openDialog = jest.fn()
  const useConfirmSubmitDialogResponse = {
    open: false,
    closeDialog,
    openDialog
  }

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

    jest
      .spyOn(useConfirmSubmitDialog, 'useConfirmSubmitDialog')
      .mockImplementation(() => useConfirmSubmitDialogResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
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

  it('redirects path to editIndividual when identity exists', () => {
    history.push(IdentityRoute.createIndividual)
    render(<IndividualInvestorForm />)

    expect(history.location.pathname).toEqual(
      generatePath(IdentityRoute.editIndividual, {
        identityId: individual._id,
        userId: individual.user._id
      })
    )
  })

  it('renders dialog box as hidden on component mount', () => {
    render(<IndividualInvestorForm />)
    expect(IdentitySubmitConfirmationDialog).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
      {}
    )
  })
})
