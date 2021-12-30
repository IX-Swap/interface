import React from 'react'
import { render } from 'test-utils'
import { DSONameAndStructure } from 'app/pages/invest/components/DSOTable/DSONameAndStructure'
import { PriceWithCurrency } from 'app/pages/invest/components/DSOTable/PriceWithCurrency'
import { DSORaised } from 'app/pages/invest/components/DSOTable/DSORaised'
import {
  renderDSONameAndStructure,
  renderPriceWithCurrency,
  renderDSOStatus,
  renderTotalFundraisingAmount,
  renderMinimumInvestment,
  renderExpectedReturn
} from 'app/pages/invest/components/DSOTable/columns'
import { dso } from '__fixtures__/authorizer'
import { dsoInsight } from '__fixtures__/issuance'

jest.mock('app/pages/invest/components/DSOTable/DSONameAndStructure', () => ({
  DSONameAndStructure: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/DSOTable/PriceWithCurrency', () => ({
  PriceWithCurrency: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/DSOTable/DSORaised', () => ({
  DSORaised: jest.fn(() => null)
}))

describe('render DSO Name', () => {
  const tokenName = 'CoinX'

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<>{renderDSONameAndStructure(tokenName, dso)}</>)
  })

  it('renders DSOName with correct props', () => {
    render(<>{renderDSONameAndStructure(tokenName, dso)}</>)

    expect(DSONameAndStructure).toHaveBeenCalledWith(
      {
        tokenName: tokenName,
        dso: dso
      },
      {}
    )
  })
})

describe('render Price With Currency', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  const price = 890000

  it.skip('renders without error', () => {
    render(<>{renderPriceWithCurrency(price, dso)}</>)
  })

  it('renders PriceWithCurrency with correct props', () => {
    render(<>{renderPriceWithCurrency(price, dso)}</>)

    expect(PriceWithCurrency).toHaveBeenCalledWith(
      {
        price: price,
        currency: dso.currency.symbol
      },
      {}
    )
  })
})

describe('render DSO Raised', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<>{renderDSOStatus(dsoInsight, dso)}</>)
  })

  it('renders DSORaised with correct props', () => {
    render(<>{renderDSOStatus(dsoInsight, dso)}</>)

    expect(DSORaised).toHaveBeenCalledWith(
      {
        insight: dsoInsight,
        dso: dso
      },
      {}
    )
  })
})

describe('render DSO Total Fundraising Amount', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  const raising = 25000

  it.skip('renders without error', () => {
    render(<>{renderTotalFundraisingAmount(raising, dso)}</>)
  })

  it('renders correct', () => {
    const { container } = render(
      <>{renderTotalFundraisingAmount(raising, dso)}</>
    )

    expect(container).toHaveTextContent('SGD 25.00K')
  })
})

describe('render DSO Minimum Investment', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  const minimumInvestment = 1000

  it.skip('renders without error', () => {
    render(<>{renderMinimumInvestment(minimumInvestment, dso)}</>)
  })

  it('renders correct', () => {
    const { container } = render(
      <>{renderMinimumInvestment(minimumInvestment, dso)}</>
    )

    expect(container).toHaveTextContent('SGD 1,000.00')
  })
})

describe('render DSO Expected Return', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  // next line just a stab
  const expectedReturn = 1000
  const dsoDebt = { ...dso, capitalStructure: 'Debt' }
  const dsoHybrid = { ...dso, capitalStructure: 'Hybrid' }
  const dsoEquity = { ...dso, capitalStructure: 'Equity' }

  it.skip('renders without error', () => {
    render(<>{renderExpectedReturn(expectedReturn, dso)}</>)
  })

  it('renders correct when capitalStructure is Debt', () => {
    const { container } = render(
      <>{renderExpectedReturn(expectedReturn, dsoDebt)}</>
    )

    expect(container).toHaveTextContent('100.00%')
  })

  it('renders correct when capitalStructure is Hybrid', () => {
    const { container } = render(
      <>{renderExpectedReturn(expectedReturn, dsoHybrid)}</>
    )

    expect(container).toHaveTextContent(`${dsoDebt.grossIRR ?? 0}%`)
  })

  it('renders correct when capitalStructure is Equity', () => {
    const { container } = render(
      <>{renderExpectedReturn(expectedReturn, dsoEquity)}</>
    )

    expect(container).toHaveTextContent(`${dsoDebt.grossIRR ?? 0}%`)
  })
})
