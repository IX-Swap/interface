/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOStatusFields,
  DSOStatusFieldsProps
} from 'v2/app/components/DSO/components/DSOStatusFields'
import { Form } from 'v2/components/form/Form'
import { useTypedForm } from '__fixtures__/createTypedForm'
import * as dsoForm from 'v2/app/components/DSO/DSOForm'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'

describe('DSOStatusFields', () => {
  const props: DSOStatusFieldsProps = {
    isEditing: false,
    dsoOwnerId: '',
    isNew: false
  }
  const EditableField = jest.fn(() => <div />)

  beforeEach(() => {
    jest
      .spyOn(dsoForm, 'useDSOForm')
      .mockReturnValue({ ...useTypedForm(), EditableField } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOStatusFields {...props} />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOStatusFields {...props} />
      </Form>
    )

    expect(EditableField).toHaveBeenCalledTimes(6)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      {
        fieldType: 'CorporateSelect',
        isEditing: props.isEditing,
        label: 'Corporate',
        name: 'corporate',
        valueExtractor: plainValueExtractor
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Status',
        name: 'status',
        inputProps: expect.anything()
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Capital Structure',
        name: 'capitalStructure'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      {
        fieldType: 'NumericField',
        isEditing: props.isEditing,
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      {
        fieldType: 'NumericField',
        isEditing: props.isEditing,
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        numberFormat: moneyNumberFormat
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      {
        fieldType: 'NumericField',
        isEditing: props.isEditing,
        label: 'Minimum Investment',
        name: 'minimumInvestment',
        numberFormat: moneyNumberFormat
      },
      {}
    )
  })

  it('renders EditableField with correct props if isNew is true', () => {
    render(
      <Form>
        <DSOStatusFields {...props} isNew />
      </Form>
    )

    expect(EditableField).toHaveBeenCalledTimes(4)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Capital Structure',
        name: 'capitalStructure'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      {
        fieldType: 'NumericField',
        isEditing: props.isEditing,
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      {
        fieldType: 'NumericField',
        isEditing: props.isEditing,
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        numberFormat: moneyNumberFormat
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      {
        fieldType: 'NumericField',
        isEditing: props.isEditing,
        label: 'Minimum Investment',
        name: 'minimumInvestment',
        numberFormat: moneyNumberFormat
      },
      {}
    )
  })
})
