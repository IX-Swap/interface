import React from 'react'
import { render, cleanup } from 'test-utils'
import { TokenSelect } from 'app/pages/accounts/components/TokenSelect'
import * as useGetCustody from 'app/pages/accounts/hooks/useGetCustody'
import { generateQueryResult } from '__fixtures__/useQuery'
import { balance } from '__fixtures__/balance'

jest.mock('@material-ui/core/MenuItem', () => jest.fn(() => null))

describe('TokenSelect', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({
      data: [balance],
      isLoading: false
    })

    jest
      .spyOn(useGetCustody, 'useGetCustody')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TokenSelect />)
  })
})
