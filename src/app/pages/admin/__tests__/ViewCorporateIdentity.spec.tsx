import { ViewCorporateIdentity } from 'app/pages/admin/pages/ViewCorporateIdentity'
import * as useCorporate from 'app/pages/identity/hooks/useCorporate'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('ViewCorporateIdentity', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({
      data: corporate,
      isLoading: false
    })

    jest
      .spyOn(useCorporate, 'useCorporate')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ViewCorporateIdentity />)
  })
})
