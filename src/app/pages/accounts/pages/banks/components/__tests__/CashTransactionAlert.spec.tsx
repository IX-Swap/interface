import React from 'react'
import { render } from 'test-utils'
import { CashTransactionAlert } from 'app/pages/accounts/pages/banks/components/CashTransactionAlert'
import * as assetsContext from 'hooks/asset/useAssetsData'
import { asset, cashDeposit } from '__fixtures__/authorizer'
import * as helpers from 'helpers/numbers'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { Form } from 'components/form/Form'

describe('CashTransactionAlert', () => {
  const testFn = jest.fn(() => <div />)
  const amount = cashDeposit.amount

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders testFn function correctly', () => {
    jest
      .spyOn(assetsContext, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [asset._id]: asset } })
      )

    const money = helpers.formatMoney(amount, asset.numberFormat.currency)

    render(
      <Form defaultValues={{ amount }}>
        <CashTransactionAlert assetId={asset._id}>
          {testFn}
        </CashTransactionAlert>
      </Form>
    )

    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenCalledWith(money)
  })

  it('calls formatMoney with correct parameters', () => {
    jest
      .spyOn(assetsContext, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [asset._id]: asset } })
      )

    const formatMoney = jest.fn()
    jest.spyOn(helpers, 'formatMoney').mockImplementation(formatMoney)

    render(
      <Form defaultValues={{ amount }}>
        <CashTransactionAlert assetId={asset._id}>
          {testFn}
        </CashTransactionAlert>
      </Form>
    )

    expect(formatMoney).toHaveBeenCalledTimes(1)
    expect(formatMoney).toHaveBeenCalledWith(
      amount,
      asset.numberFormat.currency
    )
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(assetsContext, 'useAssetsData')
      .mockReturnValue(generateInfiniteQueryResult({ isLoading: true }))

    const { queryByTestId } = render(
      <Form defaultValues={{ amount }}>
        <CashTransactionAlert assetId={asset._id}>
          {testFn}
        </CashTransactionAlert>
      </Form>
    )
    const cashTransactionAlert = queryByTestId('CashTransactionAlert')

    expect(cashTransactionAlert).toBeFalsy()
  })
})
