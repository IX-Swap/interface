import { AdminIndividualInvestorForm } from 'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualInvestorForm'
import * as useCreateIndividualByUserId from 'app/pages/admin/hooks/useCreateIndividualByUserId'
import * as useIndividualIdentityById from 'app/pages/admin/hooks/useIndividualIdentityById'
import * as useSubmitIndividual from 'app/pages/identity/hooks/useSubmitIndividual'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'
import {
  generateMutationResult,
  generateQueryResult
} from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('AdminIndividualInvestorForm', () => {
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
    // jest
    //   .spyOn(useAdminRouter, 'useAdminRouter')
    //   .mockImplementation(() => useAdminRouterResponse as any)

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
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AdminIndividualInvestorForm />)
  })

  it('renders loading text when isLoading', () => {
    const useIndividualIdentityByIdResponse = generateQueryResult({
      data: individual,
      isLoading: true
    })

    jest
      .spyOn(useIndividualIdentityById, 'useIndividualIdentityById')
      .mockImplementation(() => useIndividualIdentityByIdResponse as any)

    const { getByText } = render(<AdminIndividualInvestorForm />)

    expect(getByText('Loading...')).toBeTruthy()
  })

  it('renders null when userId is undefined', () => {
    // jest
    //   .spyOn(useAdminRouter, 'useAdminRouter')
    //   .mockImplementation(() => useAdminRouterResponse as any)

    const { container } = render(<AdminIndividualInvestorForm />)

    expect(container).toBeEmptyDOMElement()
  })
})
