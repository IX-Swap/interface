import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSONameAndStructure } from '../DSONameAndStructure'
import { PriceWithCurrency } from '../PriceWithCurrency'
import { DSORaised } from '../DSORaised'
import {
  renderDSONameAndStructure,
  renderPriceWithCurrency,
  renderDSORaised
} from '../columns'
import { dso } from '__fixtures__/authorizer'
import { corporate } from '__fixtures__/identity'
import { dsoInsight } from '__fixtures__/issuance'

jest.mock('../DSONameAndStructure', () => ({
  DSONameAndStructure: jest.fn(() => null)
}))

jest.mock('../PriceWithCurrency', () => ({
  PriceWithCurrency: jest.fn(() => null)
}))

jest.mock('../DSORaised', () => ({
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

  const price = '890000'

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
    render(<>{renderDSORaised(dsoInsight, dso)}</>)
  })

  it('renders DSORaised with correct props', () => {
    render(<>{renderDSORaised(dsoInsight, dso)}</>)

    expect(DSORaised).toHaveBeenCalledWith(
      {
        insight: dsoInsight,
        dso: dso
      },
      {}
    )
  })
})
