/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import * as reactHookForm from 'react-hook-form'
import { Preview } from 'v2/app/pages/accounts/pages/banks/DepositCash/Preview'
import { asset, cashDeposit } from '__fixtures__/authorizer'
import * as assetsContext from 'v2/context/assets/useAssetsData'

import GenericPreview from 'v2/app/components/generic-preview'
import { formatMoney } from 'v2/helpers/numbers'
import { INVESTAX_BANK } from 'v2/config'

jest.mock('v2/app/components/generic-preview', () => {
  const GenericPreview = jest.fn(() => (
    <div data-testid='generic-preview'></div>
  ))
  return GenericPreview
})

jest.mock('v2/components/form/Form', () => ({
  Form: () => <div data-testid='form'></div>
}))

describe('Preview', () => {
  beforeEach(() => {
    jest.spyOn(assetsContext, 'useAssetsData').mockReturnValue({
      data: { map: { [asset._id]: asset } }
    })

    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { asset: asset._id, amount: cashDeposit.amount }
      }
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Preview />)
  })

  it('calls GenericPreview with correct items', () => {
    const props = { depositCode: 'testCode' }

    render(<Preview {...props} />)
    expect(GenericPreview).toHaveBeenCalledTimes(1)
    expect(GenericPreview).toHaveBeenCalledWith(
      {
        items: [
          {
            label: 'Deposit Code',
            value: props.depositCode
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
