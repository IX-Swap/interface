import * as useTokenInfo from 'app/pages/accounts/hooks/useTokenInfo'
import { Network } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Network'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { network } from '__fixtures__/network'

describe('Network', () => {
  beforeEach(() => {
    const objResponse = {
      data: {
        network
      }
    }

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
      <Form>
        <Network />
      </Form>
    )
  })
})
