import React from 'react'
import { render } from 'test-utils'
import {
  DSWithdrawalPreview,
  DSWithdrawalPreviewProps
} from 'app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { dsWithdrawal } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'
import { renderName } from 'helpers/tables'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSWithdrawalPreview', () => {
  const props: DSWithdrawalPreviewProps = { data: dsWithdrawal }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders LabelledValue with correct props', () => {
    render(<DSWithdrawalPreview {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Digital Security',
        value: `${props.data.asset.name} (${props.data.asset.symbol})`
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Withdrawal By',
        value: renderName('', props.data.identity.individual)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Blockchain Address',
        value: props.data.recipientWallet
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Withdrawal Amount',
        value: formatMoney(props.data.amount, props.data.asset.symbol)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      {
        label: 'Transaction',
        value: expect.anything()
      },
      {}
    )
  })
})
