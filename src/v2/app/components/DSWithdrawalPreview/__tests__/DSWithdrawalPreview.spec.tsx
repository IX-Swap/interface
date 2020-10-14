/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSWithdrawalPreview,
  DSWithdrawalPreviewProps
} from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { dsWithdrawal } from '__fixtures__/authorizer'
import { LabelledValue } from 'v2/components/LabelledValue'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSWithdrawalPreview', () => {
  const props: DSWithdrawalPreviewProps = { data: dsWithdrawal }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSWithdrawalPreview {...props} />)
  })

  it('renders LabelledValue with correct props', () => {
    render(<DSWithdrawalPreview {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(4)
    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Digital Security',
        value: props.data.asset.name,
        labelWeight: 'thin',
        row: true
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Withdrawal Amount',
        value: formatMoney(props.data.amount, props.data.asset.symbol),
        labelWeight: 'thin',
        row: true
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      { label: 'Memo', value: props.data.memo, labelWeight: 'thin', row: true },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Withdrawal Address',
        value: props.data.recipientWallet,
        labelWeight: 'thin',
        row: true
      },
      {}
    )
  })
})
