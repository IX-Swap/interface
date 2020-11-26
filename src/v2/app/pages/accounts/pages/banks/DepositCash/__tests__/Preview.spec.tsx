import React from 'react'
import { render, cleanup } from 'test-utils'
import { Preview } from 'v2/app/pages/accounts/pages/banks/DepositCash/Preview'
import { asset, cashDeposit } from '__fixtures__/authorizer'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { formatMoney } from 'v2/helpers/numbers'
import { INVESTAX_BANK } from 'v2/config'
import * as useAssetsDataHook from 'v2/hooks/asset/useAssetsData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/app/components/GenericPreview/GenericPreview', () => ({
  GenericPreview: jest.fn(() => null)
}))

describe('Preview', () => {
  const depositCode = '1234566'
  const formValues = {
    asset: asset._id,
    amount: cashDeposit.amount
  }

  beforeEach(() => {
    jest
      .spyOn(useAssetsDataHook, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [asset._id]: asset } })
      )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={formValues}>
        <Preview depositCode={depositCode} />
      </Form>
    )
  })

  it('calls GenericPreview with correct items', () => {
    render(
      <Form defaultValues={formValues}>
        <Preview depositCode={depositCode} />
      </Form>
    )

    expect(GenericPreview).toHaveBeenCalledTimes(1)
    expect(GenericPreview).toHaveBeenCalledWith(
      {
        items: [
          {
            label: 'Deposit Code',
            value: depositCode,
            secret: true
          },
          {
            label: 'Account Number',
            value: INVESTAX_BANK.bankAccountNumber ?? ''
          },
          {
            label: 'Deposit Amount',
            value: formatMoney(cashDeposit.amount, asset.numberFormat.currency)
          }
        ]
      },
      {}
    )
  })
})
