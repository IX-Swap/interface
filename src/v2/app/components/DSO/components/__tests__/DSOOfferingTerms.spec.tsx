/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOOfferingTerms,
  DSOOfferingTermsProps
} from 'v2/app/components/DSO/components/DSOOfferingTerms'
import { Form } from 'v2/components/form/Form'
import { useTypedForm } from '__fixtures__/createTypedForm'
import * as dsoForm from 'v2/app/components/DSO/DSOForm'
import { monthsFormat, percentageFormat } from 'v2/config/monthsFormat'

describe('DSOOfferingTerms', () => {
  const props: DSOOfferingTermsProps = {
    dsoOwnerId: '',
    isEditing: false
  }
  const EditableField = jest.fn(() => <div />)

  beforeEach(() => {
    jest
      .spyOn(dsoForm, 'useDSOForm')
      .mockReturnValue({ ...useTypedForm(), EditableField })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOOfferingTerms {...props} />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOOfferingTerms {...props} />
      </Form>
    )

    expect(EditableField).toHaveBeenCalledTimes(8)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        fieldType: 'NumericField',
        numberFormat: monthsFormat,
        isEditing: props.isEditing,
        label: 'Investment Period',
        name: 'investmentPeriod'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Investment Structure',
        name: 'investmentStructure'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        fieldType: 'NumericField',
        numberFormat: percentageFormat,
        isEditing: props.isEditing,
        label: 'Interest Rate',
        name: 'interestRate'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        fieldType: 'NumericField',
        numberFormat: percentageFormat,
        isEditing: props.isEditing,
        label: 'Dividend Yield',
        name: 'dividendYield'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        fieldType: 'NumericField',
        numberFormat: percentageFormat,
        isEditing: props.isEditing,
        label: 'Equity Multiple',
        name: 'equityMultiple'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        fieldType: 'NumericField',
        numberFormat: percentageFormat,
        isEditing: props.isEditing,
        label: 'Leverage',
        name: 'leverage'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        fieldType: 'NumericField',
        numberFormat: percentageFormat,
        isEditing: props.isEditing,
        label: 'Gross IRR',
        name: 'grossIRR'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        fieldType: 'DistributionFrequency',
        isEditing: props.isEditing,
        label: 'Distribution Frequency',
        name: 'distributionFrequency'
      }),
      {}
    )
  })
})
