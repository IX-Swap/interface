import React from 'react'
import { render } from 'test-utils'
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
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { generatePath } from 'react-router-dom'
import * as useConfirmSubmitDialog from 'app/pages/identity/hooks/useConfirmSubmitDialog'

window.URL.revokeObjectURL = jest.fn()

jest.mock(
  'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog',
  () => ({
    IdentitySubmitConfirmationDialog: jest.fn(() => null)
  })
)

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
    isCorporateJourneyCompleted: true,
    corporateIdentities: [corporate]
  }

  const closeDialog = jest.fn()
  const openDialog = jest.fn()
  const useConfirmSubmitDialogResponse = {
    open: false,
    closeDialog,
    openDialog
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

    jest
      .spyOn(useConfirmSubmitDialog, 'useConfirmSubmitDialog')
      .mockImplementation(() => useConfirmSubmitDialogResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
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

  it('renders dialog box as hidden on component mount', () => {
    render(<CorporateInvestorForm />)
    expect(IdentitySubmitConfirmationDialog).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
      {}
    )
  })
})
