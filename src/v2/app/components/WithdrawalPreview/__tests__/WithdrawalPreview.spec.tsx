/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  WithdrawalPreview,
  WithdrawalViewProps
} from 'v2/app/components/WithdrawalPreview/WithdrawalPreview'
import { cashWithdrawal } from '__fixtures__/authorizer'
import { LabelledValue } from 'v2/components/LabelledValue'
import { BankDetails } from 'v2/app/components/BankDetails'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))
jest.mock('v2/app/components/BankDetails', () => ({
  BankDetails: jest.fn(() => null)
}))

describe('WithdrawalPreview', () => {
  const props: WithdrawalViewProps = {
    data: cashWithdrawal
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalPreview {...props} />)
  })

  it('renders BankDetails with correct props', () => {
    render(<WithdrawalPreview {...props} />)

    expect(BankDetails).toHaveBeenCalledTimes(1)
    expect(BankDetails).toHaveBeenCalledWith({ bank: props.data.bank }, {})
  })

  it('renders LabelledValue with correct props', () => {
    render(<WithdrawalPreview {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(2)
    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Withdrawal Amount',
        labelWeight: 'thin',
        row: true,
        value: formatMoney(props.data.amount, props.data.asset.symbol)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Memo', labelWeight: 'thin', row: true, value: props.data.memo },
      {}
    )
  })
})
