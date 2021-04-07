import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { DetailsOfIssuanceForm } from 'app/pages/_identity/components/DetailsOfIssuanceForm/DetailsOfIssuanceForm'
import * as useCreateDetailsOfIssuance from 'app/pages/_identity/hooks/useCreateDetailsOfIssuance'
import * as useDetailsOfIssuance from 'app/pages/_identity/hooks/useDetailsOfIssuance'
import * as useUpdateDetailsOfIssuance from 'app/pages/_identity/hooks/useUpdateDetailsOfIssuance'
import React from 'react'
import { render, cleanup } from 'test-utils'
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DetailsOfIssuanceForm />)
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
})
