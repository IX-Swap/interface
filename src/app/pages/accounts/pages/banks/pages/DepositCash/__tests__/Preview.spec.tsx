import React from 'react'
import { render } from 'test-utils'
import { Preview } from 'app/pages/accounts/pages/banks/pages/DepositCash/Preview'
import { asset, cashDeposit } from '__fixtures__/authorizer'
import { GenericPreview } from 'app/components/GenericPreview/GenericPreview'
import { formatMoney } from 'helpers/numbers'
import { INVESTAX_BANK } from 'config'
import * as useAssetsDataHook from 'hooks/asset/useAssetsData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { Form } from 'components/form/Form'

jest.mock('app/components/GenericPreview/GenericPreview', () => ({
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
    jest.clearAllMocks()
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
