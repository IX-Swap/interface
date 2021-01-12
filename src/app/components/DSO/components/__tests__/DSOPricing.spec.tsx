import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOPricing } from 'app/components/DSO/components/DSOPricing'
import { MinimumInvestment } from 'app/components/DSO/components/DSOMinimumInvestment'
import { TotalUnits } from 'app/components/DSO/components/TotalUnits'
import { Form } from 'components/form/Form'
import { moneyNumberFormat } from 'config/numberFormat'
import { TypedField } from 'components/form/TypedField'
import * as useParsedDataHook from 'hooks/useParsedData'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

jest.mock('app/components/DSO/components/DSOMinimumInvestment', () => ({
  MinimumInvestment: jest.fn(() => <div />)
}))

jest.mock('app/components/DSO/components/TotalUnits', () => ({
  TotalUnits: jest.fn(() => <div />)
}))

describe('DSOPricing', () => {
  const parsedDataFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(parsedDataFn)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOPricing />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOPricing />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Unit Price',
        name: 'pricePerUnit',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Minimum Investment',
        name: 'minimumInvestment',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(MinimumInvestment).toHaveBeenCalled()
    expect(TotalUnits).toHaveBeenCalled()
  })
})
