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
  const useCreateDetailsOfIssuanceResponse = [generateMutationResult({})]
  const useUpdateDetailsOfIssuanceResponse = [generateMutationResult({})]

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
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DetailsOfIssuanceForm />)
  })

  it('renders null when isLoading', () => {
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
