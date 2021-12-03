import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodyList } from 'app/pages/accounts/pages/digitalSecurities/DSList/CustodyList'
import * as useGetCustody from 'app/pages/accounts/hooks/useGetCustody'
import { generateQueryResult } from '__fixtures__/useQuery'
import { balance } from '__fixtures__/balance'

describe('CustodyList', () => {
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
    render(<CustodyList />)
  })
})
