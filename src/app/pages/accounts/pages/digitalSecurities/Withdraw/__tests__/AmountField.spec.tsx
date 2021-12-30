import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { AmountField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/AmountField'
import * as useTokenInfo from 'app/pages/accounts/hooks/useTokenInfo'
import * as useGetCustody from 'app/pages/accounts/hooks/useGetCustody'
import { network } from '__fixtures__/network'
import { balance } from '__fixtures__/balance'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('AmountField', () => {
  beforeEach(() => {
    const useTokenInfoResponse = generateQueryResult({ data: { network } })
    jest
      .spyOn(useTokenInfo, 'useTokenInfo')
      .mockImplementation(() => useTokenInfoResponse as any)

    const useGetCustodyResponse = {
      data: [
        {
          balance
        }
      ]
    }
    jest
      .spyOn(useGetCustody, 'useGetCustody')
      .mockImplementation(() => useGetCustodyResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <AmountField />
      </Form>
    )
  })
})
