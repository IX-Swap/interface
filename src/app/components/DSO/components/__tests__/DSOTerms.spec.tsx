import React from 'react'
import { render } from 'test-utils'
import { fireEvent } from '@testing-library/dom'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { monthsNumberFormat, percentageNumberFormat } from 'config/numberFormat'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

jest.mock('components/form/CorporateSelect', () => ({
  CorporateSelect: jest.fn(() => null)
}))

jest.mock('components/form/AssetSelect/AssetSelect', () => ({
  AssetSelect: jest.fn(() => null)
}))

window.URL.revokeObjectURL = jest.fn()
window.URL.createObjectURL = jest.fn()

describe('DSOTerms', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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

  it('disables leverage, interest rate fields when capital structure is "Equity"', () => {
    ;(TypedField as any).mockImplementation(
      jest.requireActual('components/form/TypedField').TypedField
    )

    const { getByTestId, getByLabelText } = render(
      <Form>
        <DSOBaseFields isNew={true} isLive={false} />
        <DSOTerms />
      </Form>
    )

    const capitalStructure = getByTestId('capital-structure')
    const leverage = getByLabelText('Leverage')
    const interestRate = getByLabelText('Interest Rate')

    fireEvent.change(capitalStructure, { target: { value: 'Equity' } })

    expect(leverage).toHaveAttribute('disabled')
    expect(leverage).toHaveAttribute('value', '')
    expect(interestRate).toHaveAttribute('disabled')
    expect(interestRate).toHaveAttribute('value', '')
  })

  it('disables dividend yield, gross irr, equity multiple fields when capital structure is "Debt"', () => {
    ;(TypedField as any).mockImplementation(
      jest.requireActual('components/form/TypedField').TypedField
    )

    const { getByTestId, getByLabelText } = render(
      <Form>
        <DSOBaseFields isNew={true} isLive={false} />
        <DSOTerms />
      </Form>
    )

    const capitalStructure = getByTestId('capital-structure')

    const dividendYield = getByLabelText('Dividend Yield')
    const grossIRR = getByLabelText('Gross IRR')
    const equityMultiple = getByLabelText('Equity Multiple')

    fireEvent.change(capitalStructure, { target: { value: 'Debt' } })

    expect(dividendYield).toHaveAttribute('disabled')
    expect(dividendYield).toHaveAttribute('value', '')
    expect(grossIRR).toHaveAttribute('disabled')
    expect(grossIRR).toHaveAttribute('value', '')
    expect(equityMultiple).toHaveAttribute('disabled')
    expect(equityMultiple).toHaveAttribute('value', '')
  })
})
