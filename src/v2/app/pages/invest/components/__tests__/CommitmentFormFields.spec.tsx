/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentFormFields,
  CommitmentFormFieldsProps
} from 'v2/app/pages/invest/components/CommitmentFormFields'
import { asset } from '__fixtures__/authorizer'
import { Form } from 'v2/components/form/Form'
import * as commitmentForm from 'v2/app/pages/invest/components/CommitmentForm'
import { generateCreateTypedFormResult } from '__fixtures__/createTypedForm'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'

describe('CommitmentFormFields', () => {
  const props: CommitmentFormFieldsProps = { symbol: asset.symbol }
  const NumericField = jest.fn(() => null) as any
  const TextField = jest.fn(() => null) as any
  const DataroomDocument = jest.fn(() => null) as any

  beforeEach(() => {
    jest.spyOn(commitmentForm, 'useCommitmentForm').mockReturnValue({
      ...generateCreateTypedFormResult(),
      NumericField,
      TextField,
      DataroomDocument
    })
  })
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

  it('renders without error if totalAmount and pricePerUnit are 0', () => {
    render(
      <Form defaultValues={{ totalAmount: 0, pricePerUnit: 0 }}>
        <CommitmentFormFields {...props} />
      </Form>
    )
  })

  it('renders NumericField with correct props', () => {
    render(
      <Form defaultValues={{ totalAmount: 0, pricePerUnit: 0 }}>
        <CommitmentFormFields {...props} />
      </Form>
    )

    expect(NumericField).toHaveBeenCalledTimes(3)
    expect(NumericField).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Investment Amount',
        name: 'totalAmount',
        numberFormat: moneyNumberFormat
      },
      {}
    )
    expect(NumericField).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat,
        inputProps: { disabled: true, startAdornment: expect.anything() }
      },
      {}
    )

    const {
      thousandSeparator,
      ...moneyNumberFormatWithoutThousandSep
    } = moneyNumberFormat
    expect(NumericField).toHaveBeenNthCalledWith(
      3,
      {
        name: 'numberOfUnits',
        label: 'Number of Units',
        numberFormat: moneyNumberFormatWithoutThousandSep,
        inputProps: { disabled: true },
        valueProvider: expect.any(Function)
      },
      {}
    )
  })

  it('renders TextField with correct props', () => {
    render(
      <Form defaultValues={{ totalAmount: 0, pricePerUnit: 0 }}>
        <CommitmentFormFields {...props} />
      </Form>
    )

    expect(TextField).toHaveBeenCalledTimes(2)
    expect(TextField).toHaveBeenNthCalledWith(
      1,
      { label: 'Destination Wallet Address', name: 'walletAddress' },
      {}
    )
    expect(TextField).toHaveBeenNthCalledWith(
      2,
      { label: 'OTP', name: 'otp' },
      {}
    )
  })

  it('renders DataroomDocument with correct props', () => {
    render(
      <Form defaultValues={{ totalAmount: 0, pricePerUnit: 0 }}>
        <CommitmentFormFields {...props} />
      </Form>
    )

    expect(DataroomDocument).toHaveBeenCalledTimes(1)
    expect(DataroomDocument).toHaveBeenCalledWith(
      {
        canDelete: false,
        label: 'Subscription Document',
        name: 'signedSubscriptionDocument',
        uploadComponent: expect.anything()
      },
      {}
    )
  })
})
