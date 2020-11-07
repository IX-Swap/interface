/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOStatusFields } from 'v2/app/components/DSO/components/DSOStatusFields'
import { Form } from 'v2/components/form/Form'
import { moneyNumberFormat } from 'v2/config/numberFormat'
import { TypedField } from 'v2/components/form/TypedField'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOStatusFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOStatusFields />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOStatusFields />
      </Form>
    )

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
