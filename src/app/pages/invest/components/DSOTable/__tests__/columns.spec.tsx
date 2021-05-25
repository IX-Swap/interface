import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSONameAndStructure } from 'app/pages/invest/components/DSOTable/DSONameAndStructure'
import { PriceWithCurrency } from 'app/pages/invest/components/DSOTable/PriceWithCurrency'
import { DSORaised } from 'app/pages/invest/components/DSOTable/DSORaised'
import {
  renderDSONameAndStructure,
  renderPriceWithCurrency,
  renderDSOStatus
} from 'app/pages/invest/components/DSOTable/columns'
import { dso } from '__fixtures__/authorizer'
import { dsoInsight } from '__fixtures__/issuance'

jest.mock('app/pages/invest/__tests__/DSOTable/DSONameAndStructure', () => ({
  DSONameAndStructure: jest.fn(() => null)
}))

jest.mock('app/pages/invest/__tests__/DSOTable/PriceWithCurrency', () => ({
  PriceWithCurrency: jest.fn(() => null)
}))

jest.mock('app/pages/invest/__tests__/DSOTable/DSORaised', () => ({
  DSORaised: jest.fn(() => null)
}))

describe('render DSO Name', () => {
  const tokenName = 'CoinX'

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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
    await cleanup()
    jest.clearAllMocks()
  })

  const price = 890000

  it('renders without error', () => {
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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
