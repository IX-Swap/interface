/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOOfferingTerms } from 'v2/app/components/DSO/components/DSOOfferingTerms'
import { Form } from 'v2/components/form/Form'
import { monthsFormat, percentageFormat } from 'v2/config/numberFormat'
import { TypedField } from 'v2/components/form/TypedField'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOOfferingTerms', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOOfferingTerms />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOOfferingTerms />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(8)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        numberFormat: monthsFormat,
        label: 'Investment Period',
        name: 'investmentPeriod'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Investment Structure',
        name: 'investmentStructure'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Interest Rate',
        name: 'interestRate'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Dividend Yield',
        name: 'dividendYield'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Equity Multiple',
        name: 'equityMultiple'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Leverage',
        name: 'leverage'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Gross IRR',
        name: 'grossIRR'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        label: 'Distribution Frequency',
        name: 'distributionFrequency'
      }),
      {}
    )
  })
})
