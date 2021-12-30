import React from 'react'
import { render } from 'test-utils'
import { IssuanceDetailsAuthorization } from 'app/pages/authorizer/pages/issuanceDetails/IssuanceDetailsAuthorization'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useDetailsOfIssuance from 'app/pages/identity/hooks/useDetailsOfIssuance'

describe('IssuanceDetailsAuthorization', () => {
  afterEach(async () => {})

  it.skip('renders without errors', async () => {
    render(<IssuanceDetailsAuthorization />)
  })

  it('renders empty container when data is undefined', () => {
    const useDetailsOfIssuanceLoading = generateQueryResult({
      data: undefined
    })

    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => useDetailsOfIssuanceLoading as any)

    const { container } = render(<IssuanceDetailsAuthorization />)

    expect(container).toBeEmpty()
  })

  it('renders empty container when isLoading', () => {
    const useDetailsOfIssuanceLoading = generateQueryResult({
      isLoading: true
    })

    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => useDetailsOfIssuanceLoading as any)

    const { container } = render(<IssuanceDetailsAuthorization />)

    expect(container).toBeEmpty()
  })
})
