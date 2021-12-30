import React from 'react'
import { render } from 'test-utils'
import * as useAllCorporatesByUserId from 'app/pages/admin/hooks/useAllCorporatesByUserId'
import { corporate } from '__fixtures__/identity'
import {
  generateInfiniteQueryResult,
  generateMutationResult
} from '__fixtures__/useQuery'
import * as useCreateCorporateByUserId from 'app/pages/admin/hooks/useCreateCorporateByUserId'
import * as useUpdateCorporateByUserId from 'app/pages/admin/hooks/useUpdateCorporateByUserId'
import * as useSubmitCorporateById from 'app/pages/admin/hooks/useSubmitCorporateById'
import { AdminCorporateIssuerForm } from 'app/pages/admin/components/AdminCorporateIssuerForm/AdminCorporateIssuerForm'

window.URL.revokeObjectURL = jest.fn()

describe('AdminCorporateIssuerForm', () => {
  const useAllCorporatesByUserIdResponse = generateInfiniteQueryResult({
    list: [corporate],
    isLoading: false
  })
  const mutateFn = jest.fn()
  const mutationResult = generateMutationResult({
    data: corporate,
    isLoading: false
  })
  const useCreateCorporateByUserIdResponse = mutationResult
  const useUpdateCorporateByUserIdResponse = mutationResult
  const useSubmitCorporateByIdResponse = mutationResult

  beforeEach(() => {
    // jest
    //   .spyOn(useAdminRouter, 'useAdminRouter')
    //   .mockImplementation(() => useAdminRouterResponse as any)

    jest
      .spyOn(useAllCorporatesByUserId, 'useAllCorporatesByUserId')
      .mockImplementation(() => useAllCorporatesByUserIdResponse as any)

    jest
      .spyOn(useCreateCorporateByUserId, 'useCreateCorporateByUserId')
      .mockImplementation(
        () => [mutateFn, useCreateCorporateByUserIdResponse] as any
      )

    jest
      .spyOn(useUpdateCorporateByUserId, 'useUpdateCorporateByUserId')
      .mockImplementation(
        () => [mutateFn, useUpdateCorporateByUserIdResponse] as any
      )

    jest
      .spyOn(useSubmitCorporateById, 'useSubmitCorporateById')
      .mockImplementation(
        () => [mutateFn, useSubmitCorporateByIdResponse] as any
      )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('rendeers loading text when isLoading', () => {
    const useAllCorporatesByUserIdResponse = generateInfiniteQueryResult({
      list: [corporate],
      isLoading: true
    })
    jest
      .spyOn(useAllCorporatesByUserId, 'useAllCorporatesByUserId')
      .mockImplementation(() => useAllCorporatesByUserIdResponse as any)
    const { getByText } = render(<AdminCorporateIssuerForm />)

    expect(getByText('Loading...')).toBeTruthy()
  })
})
