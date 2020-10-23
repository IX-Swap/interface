/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOOfferingTerms } from 'v2/app/components/DSO/components/DSOOfferingTerms'
import { Form } from 'v2/components/form/Form'
import { monthsFormat, percentageFormat } from 'v2/config/monthsFormat'

describe('DSOOfferingTerms', () => {
  const EditableField = jest.fn(() => <div />)

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

    expect(EditableField).toHaveBeenCalledTimes(8)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        numberFormat: monthsFormat,
        label: 'Investment Period',
        name: 'investmentPeriod'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Investment Structure',
        name: 'investmentStructure'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Interest Rate',
        name: 'interestRate'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Dividend Yield',
        name: 'dividendYield'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Equity Multiple',
        name: 'equityMultiple'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Leverage',
        name: 'leverage'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        numberFormat: percentageFormat,
        label: 'Gross IRR',
        name: 'grossIRR'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        label: 'Distribution Frequency',
        name: 'distributionFrequency'
      }),
      {}
    )
  })
})
