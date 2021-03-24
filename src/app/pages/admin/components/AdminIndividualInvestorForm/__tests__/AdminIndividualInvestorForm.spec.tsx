import { AdminIndividualInvestorForm } from 'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualInvestorForm'
import * as useCreateIndividualByUserId from 'app/pages/admin/hooks/useCreateIndividualByUserId'
import * as useIndividualIdentityById from 'app/pages/admin/hooks/useIndividualIdentityById'
import * as useAdminRouter from 'app/pages/admin/router'
import * as useSubmitIndividual from 'app/pages/_identity/hooks/useSubmitIndividual'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'
import {
  generateMutationResult,
  generateQueryResult
} from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('AdminIndividualInvestorForm', () => {
  const useAdminRouterResponse = { params: { userId: individual._id } }
  const useIndividualIdentityByIdResponse = generateQueryResult({
    data: individual,
    isLoading: false
  })
  const mutationFn = jest.fn()
  const useCreateIndividualByUserIdResponse = generateMutationResult({
    data: individual,
    isLoading: false
  })
  const useSubmitIndividualResponse = generateMutationResult({
    data: individual,
    isLoading: false
  })

  beforeEach(() => {
    jest
      .spyOn(useAdminRouter, 'useAdminRouter')
      .mockImplementation(() => useAdminRouterResponse as any)

    jest
      .spyOn(useIndividualIdentityById, 'useIndividualIdentityById')
      .mockImplementation(() => useIndividualIdentityByIdResponse as any)

    jest
      .spyOn(useCreateIndividualByUserId, 'useCreateIndividualByUserId')
      .mockImplementation(
        () => [mutationFn, useCreateIndividualByUserIdResponse] as any
      )

    jest
      .spyOn(useSubmitIndividual, 'useSubmitIndividual')
      .mockImplementation(
        () => [mutationFn, useSubmitIndividualResponse] as any
      )
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AdminIndividualInvestorForm />)
  })
})
