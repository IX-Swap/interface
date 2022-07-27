import { AddressSelect } from 'app/pages/invest/components/MakeCommitment/AddressSelect'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useWithdrawalAddresses from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

describe('AddressSelect', () => {
  beforeEach(() => {
    const objResponse = {
      data: {
        list: [withdrawalAddress, { ...withdrawalAddress, status: 'Draft' }]
      },
      status: 'not-loading'
    }

    jest
      .spyOn(useWithdrawalAddresses, 'useWithdrawalAddresses')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <AddressSelect />
      </Form>
    )
  })
})
