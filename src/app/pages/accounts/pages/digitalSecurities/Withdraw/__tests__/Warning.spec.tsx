import { Warning } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Warning'
import * as useTokenInfo from 'app/pages/accounts/hooks/useTokenInfo'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { network } from '__fixtures__/network'

describe('Warning', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({ data: { network } })

    jest
      .spyOn(useTokenInfo, 'useTokenInfo')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form
        defaultValues={{
          token: 'SYMBOL'
        }}
      >
        <Warning />
      </Form>
    )
  })
})
