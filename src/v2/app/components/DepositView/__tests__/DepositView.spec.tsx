/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DepositView,
  DepositViewProps
} from 'v2/app/components/DepositView/DepositView'
import { cashDeposit } from '__fixtures__/authorizer'
import { LabelledValue } from 'v2/components/LabelledValue'
import { formatMoney } from 'v2/helpers/numbers'
import { BankDetails } from 'v2/app/components/BankDetails'
import { INVESTAX_BANK } from 'v2/config'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))
jest.mock('v2/app/components/BankDetails', () => ({
  BankDetails: jest.fn(() => null)
}))

describe('DepositView', () => {
  const props: DepositViewProps = { data: cashDeposit }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DepositView {...props} />)
  })

  it('renders LabelledValue with correct props', () => {
    render(<DepositView {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(2)
    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Deposit Amount',
        value: formatMoney(props.data.amount, props.data.asset.symbol)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Deposit Code', value: props.data.depositCode },
      {}
    )
  })

  it('renders BankDetails with correct props', () => {
    render(<DepositView {...props} />)

    expect(BankDetails).toHaveBeenCalledTimes(1)
    expect(BankDetails).toHaveBeenCalledWith({ bank: { ...INVESTAX_BANK } }, {})
  })
})
