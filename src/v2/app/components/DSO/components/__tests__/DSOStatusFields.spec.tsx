/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOStatusFields,
  DSOStatusFieldsProps
} from 'v2/app/components/DSO/components/DSOStatusFields'
import { Form } from 'v2/components/form/Form'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'
import { EditableField } from 'v2/components/form/EditableField'

jest.mock('v2/components/form/EditableField', () => ({
  EditableField: jest.fn(() => <input />)
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

    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Corporate',
        name: 'corporate'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Status',
        name: 'status',
        inputProps: expect.anything()
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Capital Structure',
        name: 'capitalStructure'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
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

    expect(EditableField).toHaveBeenCalledTimes(4)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Capital Structure',
        name: 'capitalStructure'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
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
