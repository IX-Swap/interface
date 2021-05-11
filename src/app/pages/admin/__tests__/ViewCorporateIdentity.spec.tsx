import { ViewCorporateIdentity } from 'app/pages/admin/pages/ViewCorporateIdentity'
import * as useCorporate from 'app/pages/identity/hooks/useCorporate'
import React from 'react'
import { render, cleanup } from 'test-utils'
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ViewCorporateIdentity />)
  })
})
