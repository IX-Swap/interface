/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOStatusFields,
  DSOStatusFieldsProps
} from 'v2/app/components/DSO/components/DSOStatusFields'
import { Form } from 'v2/components/form/Form'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'
import { TypedField } from 'v2/components/form/TypedField'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOStatusFields', () => {
  const props: DSOStatusFieldsProps = {
    isNew: false
  }

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

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Corporate',
        name: 'corporate'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Status',
        name: 'status',
        inputProps: expect.anything()
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Capital Structure',
        name: 'capitalStructure'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        label: 'Minimum Investment',
        name: 'minimumInvestment',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
  })

  it('renders EditableField with correct props if isNew is true', () => {
    render(
      <Form>
        <DSOStatusFields {...props} isNew />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(4)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Capital Structure',
        name: 'capitalStructure'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Minimum Investment',
        name: 'minimumInvestment',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
  })
})
