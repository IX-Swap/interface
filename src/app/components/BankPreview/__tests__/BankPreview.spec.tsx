import React from 'react'
import { render } from 'test-utils'
import {
  BankPreview,
  BankViewProps
} from 'app/components/BankPreview/BankPreview'
import { Bank } from 'types/bank'
import { bank } from '__fixtures__/authorizer'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { LabelledValue } from 'components/LabelledValue'
import { privateClassNames } from 'helpers/classnames'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('BankPreview', () => {
  const props: BankViewProps = { data: bank }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if data is null', () => {
    const { container } = render(<BankPreview data={null as unknown as Bank} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders LabelledValue with correct props', () => {
    render(<BankPreview {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Bank Name', value: props.data.bankName },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Account Holder Name', value: props.data.accountHolderName },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      { label: 'Currency', value: props.data.currency.symbol },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Bank Account Number',
        value: props.data.bankAccountNumber,
        className: privateClassNames()
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      {
        label: 'Swift Code',
        value: props.data.swiftCode,
        className: privateClassNames()
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      {
        label: 'Bank Address',
        value: convertAddressToString(props.data.address)
      },
      {}
    )
  })
})
