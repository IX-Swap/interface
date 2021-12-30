import { ViewIndividualIdentity } from 'app/pages/admin/pages/ViewIndividualIdentity'
import * as useAuth from 'hooks/auth/useAuth'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

window.URL.revokeObjectURL = jest.fn()

describe('ViewIndividualIdentity', () => {
  beforeEach(() => {
    const useAuthResponse = { user: user }

    jest
      .spyOn(useAuth, 'useAuth')
      .mockImplementation(() => useAuthResponse as any)

    const useIndividualIdentityResponse = generateQueryResult({
      data: individual,
      isLoading: false
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ViewIndividualIdentity />)
  })
})
