/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CashTransactionAlert } from 'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert'

import * as reactHookForm from 'react-hook-form'
import * as assetsContext from 'v2/context/assets/useAssetsData'
import { cashDeposit, asset } from '__fixtures__/authorizer'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('react-hook-form')

const testFn = jest.fn()

jest.mock('v2/helpers/numbers', () => ({
  formatMoney: jest.fn(() => 'hello')
}))

jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
  getValues () {
    return { amount: cashDeposit.amount }
  }
})

describe('CashTransactionAlert', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders child funcion correctly', () => {
    jest.spyOn(assetsContext, 'useAssetsData').mockReturnValue({
      data: { map: { [asset._id]: asset } },
      status: 'success'
    })

    render(
      <CashTransactionAlert assetId={asset._id}>{testFn}</CashTransactionAlert>
    )

    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenCalledWith('hello')
  })

  it('calls formatMoney with correct parameters', () => {
    jest.spyOn(assetsContext, 'useAssetsData').mockReturnValue({
      data: { map: { [asset._id]: asset } },
      status: 'success'
    })

    render(
      <CashTransactionAlert assetId={asset._id}>{testFn}</CashTransactionAlert>
    )

    expect(formatMoney).toHaveBeenCalledTimes(1)
    expect(formatMoney).toHaveBeenCalledWith(
      cashDeposit.amount,
      asset.numberFormat.currency
    )
  })

  it('renders nothing if loading', () => {
    jest.spyOn(assetsContext, 'useAssetsData').mockReturnValue({
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
