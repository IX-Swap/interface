import { Warning } from '@material-ui/icons'
import * as useTokenInfo from 'app/pages/accounts/hooks/useTokenInfo'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
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
