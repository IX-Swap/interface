import React from 'react'
import { render } from 'test-utils'
import {
  CommitmentFormFields,
  CommitmentFormFieldsProps
} from 'app/pages/invest/components/CommitmentFormFields'
import { asset } from '__fixtures__/authorizer'
import { Form } from 'components/form/Form'
import { moneyNumberFormat } from 'config/numberFormat'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { UploadSignedSubscriptionDocument } from 'components/dataroom/UploadSignedSubscriptionDocument'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('CommitmentFormFields', () => {
  const props: CommitmentFormFieldsProps = { symbol: asset.symbol }

  afterEach(async () => {
    jest.clearAllMocks()
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
        name: 'numberOfUnits',
        label: 'Number of Units',
        numberFormat: {
          ...moneyNumberFormat,
          decimalScale: props.decimalScale ?? 18
        }
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
        name: 'totalAmount',
        label: 'Investment Amount',
        numberFormat: moneyNumberFormat,
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
        name: 'otp'
      }),
      {}
    )
  })
})
