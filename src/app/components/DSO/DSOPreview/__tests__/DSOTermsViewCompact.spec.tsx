import React from 'react'
import { render } from 'test-utils'
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
    jest.clearAllMocks()
  })

  it('renders Investment Period with correct props', () => {
    render(<DSOTermsViewCompact {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Investment Period',
        value: `${dso.investmentPeriod ?? ''} months`
      },
      {}
    )
  })

  it('renders Interest Rate with correct props when capitalStructure is Debt', () => {
    render(<DSOTermsViewCompact {...debtProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Interest Rate'
      }),
      {}
    )
  })

  it('renders Dividend Yield with correct props when capitalStructure is Equity', () => {
    render(<DSOTermsViewCompact {...equityProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ label: 'Dividend Yield (%)' }),
      {}
    )
  })

  it('renders Dividend Yield with correct props when capitalStructure is Hybrid', () => {
    render(<DSOTermsViewCompact {...hybridProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Dividend Yield (%)'
      }),
      {}
    )
  })

  it('renders Investment Structure with correct props', () => {
    render(<DSOTermsViewCompact {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Investment Structure', value: dso.investmentStructure },
      {}
    )
  })

  it('renders Leverage with correct props when capitalStructure is Debt', () => {
    render(<DSOTermsViewCompact {...debtProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({ label: 'Leverage' }),
      {}
    )
  })

  it('renders Gross IRR with correct props when capitalStructure is Equity', () => {
    render(<DSOTermsViewCompact {...equityProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({ label: 'Gross IRR (%)' }),
      {}
    )
  })

  it('renders Gross IRR with correct props when capitalStructure is Hybrid', () => {
    render(<DSOTermsViewCompact {...hybridProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({ label: 'Gross IRR (%)' }),
      {}
    )
  })

  it('renders Equity Multiple with correct props when capitalStructure is Equity', () => {
    render(<DSOTermsViewCompact {...equityProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({ label: 'Equity Multiple (%)' }),
      {}
    )
  })

  it('renders Equity Multiple with correct props when capitalStructure is Hybrid', () => {
    render(<DSOTermsViewCompact {...hybridProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        label: 'Equity Multiple (%)'
      }),
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
      8,
      { label: 'Distribution Frequency', value: dso.distributionFrequency },
      {}
    )
  })
})
