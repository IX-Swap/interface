import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  DSOTermsViewCompact,
  DSOTermsViewCompactProps
} from 'app/components/DSO/DSOPreview/DSOTermsViewCompact'
import { LabelledValue } from 'components/LabelledValue'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSOTermsViewCompact', () => {
  const props: DSOTermsViewCompactProps = {
    dso: dso
  }
  const debtProps: DSOTermsViewCompactProps = {
    dso: { ...dso, capitalStructure: 'Debt' }
  }
  const equityProps: DSOTermsViewCompactProps = {
    dso: { ...dso, capitalStructure: 'Equity' }
  }
  const hybridProps: DSOTermsViewCompactProps = {
    dso: { ...dso, capitalStructure: 'Hybrid' }
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOTermsViewCompact {...props} />)
  })

  it('renders Investment Period with correct props', () => {
    render(<DSOTermsViewCompact {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Investment Period (months)', value: dso.investmentPeriod },
      {}
    )
  })

  it('renders Interest Rate with correct props when capitalStructure is Debt', () => {
    render(<DSOTermsViewCompact {...debtProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Interest Rate', value: dso.interestRate },
      {}
    )
  })

  it('renders Dividend Yield with correct props when capitalStructure is Equity', () => {
    render(<DSOTermsViewCompact {...equityProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Dividend Yield (%)', value: dso.dividendYield },
      {}
    )
  })

  it('renders Dividend Yield with correct props when capitalStructure is Hybrid', () => {
    render(<DSOTermsViewCompact {...hybridProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Dividend Yield (%)', value: dso.dividendYield },
      {}
    )
  })

  it('renders Investment Structure with correct props', () => {
    render(<DSOTermsViewCompact {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      { label: 'Investment Structure', value: dso.investmentStructure },
      {}
    )
  })

  it('renders Leverage with correct props when capitalStructure is Debt', () => {
    render(<DSOTermsViewCompact {...debtProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Leverage', value: dso.leverage },
      {}
    )
  })

  it('renders Gross IRR with correct props when capitalStructure is Equity', () => {
    render(<DSOTermsViewCompact {...equityProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Gross IRR (%)', value: dso.grossIRR },
      {}
    )
  })

  it('renders Gross IRR with correct props when capitalStructure is Hybrid', () => {
    render(<DSOTermsViewCompact {...hybridProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Gross IRR (%)', value: dso.grossIRR },
      {}
    )
  })

  it('renders Equity Multiple with correct props when capitalStructure is Equity', () => {
    render(<DSOTermsViewCompact {...equityProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      { label: 'Equity Multiple (%)', value: dso.equityMultiple },
      {}
    )
  })

  it('renders Equity Multiple with correct props when capitalStructure is Hybrid', () => {
    render(<DSOTermsViewCompact {...hybridProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      { label: 'Equity Multiple (%)', value: dso.equityMultiple },
      {}
    )
  })

  it('renders Distribution Frequency with correct props when capitalStructure is Debt', () => {
    render(<DSOTermsViewCompact {...debtProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      { label: 'Distribution Frequency', value: dso.distributionFrequency },
      {}
    )
  })

  it('renders Distribution Frequency with correct props when capitalStructure is Equity', () => {
    render(<DSOTermsViewCompact {...equityProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      { label: 'Distribution Frequency', value: dso.distributionFrequency },
      {}
    )
  })

  it('renders Distribution Frequency with correct props when capitalStructure is Hybrid', () => {
    render(<DSOTermsViewCompact {...hybridProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      { label: 'Distribution Frequency', value: dso.distributionFrequency },
      {}
    )
  })
})
