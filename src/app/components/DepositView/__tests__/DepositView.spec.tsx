import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DepositView,
  DepositViewProps
} from 'app/components/DepositView/DepositView'
import { cashDeposit } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'
import { BankDetails } from 'app/components/BankDetails'
import { INVESTAX_BANK } from 'config'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))
jest.mock('app/components/BankDetails', () => ({
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

    expect(BankDetails).toHaveBeenCalledWith({ bank: { ...INVESTAX_BANK } }, {})
  })
})
