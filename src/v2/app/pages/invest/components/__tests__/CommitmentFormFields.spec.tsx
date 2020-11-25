import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentFormFields,
  CommitmentFormFieldsProps
} from 'v2/app/pages/invest/components/CommitmentFormFields'
import { asset } from '__fixtures__/authorizer'
import { Form } from 'v2/components/form/Form'
import { moneyNumberFormat } from 'v2/config/numberFormat'
import { TypedField } from 'v2/components/form/TypedField'
import { plainValueExtractor } from 'v2/helpers/forms'
import { UploadSignedSubscriptionDocument } from 'v2/components/dataroom/UploadSignedSubscriptionDocument'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('CommitmentFormFields', () => {
  const props: CommitmentFormFieldsProps = { symbol: asset.symbol }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{ totalAmount: 100, pricePerUnit: 50 }}>
        <CommitmentFormFields {...props} />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form defaultValues={{ totalAmount: 0, pricePerUnit: 0 }}>
        <CommitmentFormFields {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Subscription Document',
        name: 'signedSubscriptionDocument',
        valueExtractor: plainValueExtractor,
        render: UploadSignedSubscriptionDocument,
        component: DataroomUploader,
        documentInfo: {
          title: 'Signed Subscription Document',
          type: 'Signed Subscription Document'
        }
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Investment Amount',
        name: 'totalAmount',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat,
        disabled: true
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        name: 'numberOfUnits',
        label: 'Number of Units',
        numberFormat: { ...moneyNumberFormat, decimalScale: 10 },
        disabled: true
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        name: 'withdrawalAddress',
        label: 'Destination Wallet Address'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        name: 'otp',
        label: 'OTP'
      }),
      {}
    )
  })
})
