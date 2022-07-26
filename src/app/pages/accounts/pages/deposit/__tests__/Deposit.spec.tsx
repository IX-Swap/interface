import React from 'react'
import { render } from 'test-utils'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'
import { Deposit } from 'app/pages/accounts/pages/deposit/Deposit'

describe('Deposit', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const useVirtualAccountsResponse = generateQueryResult({
      data: virtualAccountsSample[0],
      isLoading: false
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountsResponse as any)

    const { container } = render(<Deposit />)
    expect(container).toMatchSnapshot()
  })
})
