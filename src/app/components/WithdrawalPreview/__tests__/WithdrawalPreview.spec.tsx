import React from 'react'
import { render } from 'test-utils'
import {
  WithdrawalPreview,
  WithdrawalViewProps
} from 'app/components/WithdrawalPreview/WithdrawalPreview'
import { cashWithdrawal } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))
jest.mock('app/components/BankDetails', () => ({
  BankDetails: jest.fn(() => null)
}))

describe('WithdrawalPreview', () => {
  const props: WithdrawalViewProps = {
    data: cashWithdrawal
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<WithdrawalPreview {...props} />)
  })

  it('renders LabelledValue with correct props', () => {
    render(<WithdrawalPreview {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Bank Name',
        value: props.data.bank.bankName
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Account Holder Name',
        value: props.data.bank.accountHolderName
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Virtual Account',
        value: props.data.virtualAccount.accountNumber
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Swift Code',
        value: props.data.bank.swiftCode
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      {
        label: 'Currency',
        value: props.data.bank?.currency?.symbol
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      {
        label: 'Bank Address',
        value: convertAddressToString(props.data.bank.address)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      7,
      {
        label: 'Bank Contact Number',
        value: props.data.bank.bankAccountNumber
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      8,
      {
        label: 'Withdrawal Method',
        value: undefined
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      9,
      {
        label: 'Withdrawal Amount',
        value: formatMoney(props.data.amount, props.data.asset.symbol)
      },
      {}
    )
  })
})
