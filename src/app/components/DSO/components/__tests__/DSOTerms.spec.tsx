import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { Form } from 'components/form/Form'
import { monthsNumberFormat, percentageNumberFormat } from 'config/numberFormat'
import { TypedField } from 'components/form/TypedField'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOTerms', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOTerms />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOTerms />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(8)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        numberFormat: monthsNumberFormat,
        label: 'Investment Period',
        name: 'investmentPeriod'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        numberFormat: percentageNumberFormat,
        label: 'Dividend Yield',
        name: 'dividendYield'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        numberFormat: percentageNumberFormat,
        label: 'Interest Rate',
        name: 'interestRate'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        numberFormat: percentageNumberFormat,
        label: 'Gross IRR',
        name: 'grossIRR'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Investment Structure',
        name: 'investmentStructure'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        label: 'Distribution Frequency',
        name: 'distributionFrequency'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        numberFormat: percentageNumberFormat,
        label: 'Leverage',
        name: 'leverage'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        numberFormat: percentageNumberFormat,
        label: 'Equity Multiple',
        name: 'equityMultiple'
      }),
      {}
    )
  })
})
