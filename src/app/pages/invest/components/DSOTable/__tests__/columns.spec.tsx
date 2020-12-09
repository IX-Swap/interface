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
import { corporate } from '__fixtures__/identity'
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
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<>{renderDSONameAndStructure(corporate, dso)}</>)
  })

  it('renders DSOName with correct props', () => {
    render(<>{renderDSONameAndStructure(corporate, dso)}</>)

    expect(DSONameAndStructure).toHaveBeenCalledWith(
      {
        corporate: corporate,
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
