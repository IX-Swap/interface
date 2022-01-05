import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { DetailsOfIssuanceForm } from 'app/pages/identity/components/DetailsOfIssuanceForm/DetailsOfIssuanceForm'
import * as useCreateDetailsOfIssuance from 'app/pages/identity/hooks/useCreateDetailsOfIssuance'
import * as useDetailsOfIssuance from 'app/pages/identity/hooks/useDetailsOfIssuance'
import * as useUpdateDetailsOfIssuance from 'app/pages/identity/hooks/useUpdateDetailsOfIssuance'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { history } from 'config/history'
import React from 'react'
import { render } from 'test-utils'
import { detailsOfIssuance } from '__fixtures__/identity'
import {
  generateMutationResult,
  generateQueryResult
} from '__fixtures__/useQuery'

describe('DetailsOfIssuanceForm', () => {
  const useDetailsOfIssuanceResponse = generateQueryResult({
    data: detailsOfIssuance,
    isLoading: false
  })
  const useCreateDetailsOfIssuanceResponse = [
    generateMutationResult({}),
    { isLoading: false }
  ]
  const useUpdateDetailsOfIssuanceResponse = [
    generateMutationResult({}),
    { isLoading: false }
  ]

  const createDialogMock = jest.fn()
  const useOnboardingDialogResponse = {
    showCreateDetailsOfIssuanceDialog: createDialogMock
  }

  beforeEach(() => {
    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => useDetailsOfIssuanceResponse as any)

    jest
      .spyOn(useCreateDetailsOfIssuance, 'useCreateDetailsOfIssuance')
      .mockImplementation(() => useCreateDetailsOfIssuanceResponse as any)

    jest
      .spyOn(useUpdateDetailsOfIssuance, 'useUpdateDetailsOfIssuance')
      .mockImplementation(() => useUpdateDetailsOfIssuanceResponse as any)

    jest
      .spyOn(useOnboardingDialog, 'useOnboardingDialog')
      .mockImplementation(() => useOnboardingDialogResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('shows create dialog box on render when details of issuance is undefined', () => {
    const undefinedResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => undefinedResponse as any)

    render(<DetailsOfIssuanceForm />)

    expect(createDialogMock).toHaveBeenCalled()
  })

  it('renders loading text when isLoading', () => {
    const useDetailsOfIssuanceLoading = generateQueryResult({
      data: undefined,
      isLoading: true
    })

    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => useDetailsOfIssuanceLoading as any)

    const { getByText } = render(<DetailsOfIssuanceForm />)

    expect(getByText('Loading...')).toBeTruthy()
  })

  it('redirects to create issuer form if details of issuance is skipped', () => {
    const useDetailsOfIssuanceLoading = generateQueryResult({
      data: { skipped: true },
      isLoading: false
    })

    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => useDetailsOfIssuanceLoading as any)

    render(<DetailsOfIssuanceForm />)

    expect(history.location.pathname).toBe(IdentityRoute.createIssuer)
  })
})
