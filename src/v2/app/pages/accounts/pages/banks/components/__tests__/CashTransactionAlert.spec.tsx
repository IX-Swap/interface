/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CashTransactionAlert } from 'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert'

import { useFormContext } from 'react-hook-form'
import { useAssetsData } from 'v2/context/assets/useAssetsData'
import { cashDeposit, asset } from '__fixtures__/authorizer'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('react-hook-form')
jest.mock('v2/context/assets/useAssetsData')

const testFn = jest.fn()

jest.mock('v2/helpers/numbers', () => ({
  formatMoney: jest.fn(() => 'hello')
}))

describe('CashTransactionAlert', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      getValues () {
        return { amount: cashDeposit.amount }
      }
    })
    useAssetsData.mockReturnValue({
      data: { map: { [asset._id]: asset } },
      status: 'success'
    })

    render(
      <CashTransactionAlert assetId={asset._id}>{testFn}</CashTransactionAlert>
    )

    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenCalledWith('hello')
    expect(formatMoney).toHaveBeenCalledTimes(1)
    expect(formatMoney).toHaveBeenCalledWith(
      cashDeposit.amount,
      asset.numberFormat.currency
    )
  })

  it('renders nothing if loading', () => {
    useFormContext.mockReturnValue({
      getValues () {
        return { amount: cashDeposit.amount }
      }
    })
    useAssetsData.mockReturnValue({
      data: { map: { [asset._id]: asset } },
      status: 'loading'
    })

    const { container } = render(
      <CashTransactionAlert assetId={asset._id}>{testFn}</CashTransactionAlert>
    )

    expect(container).toBeEmptyDOMElement()

    expect(testFn).toHaveBeenCalledTimes(0)
    expect(formatMoney).toHaveBeenCalledTimes(0)
  })
})
