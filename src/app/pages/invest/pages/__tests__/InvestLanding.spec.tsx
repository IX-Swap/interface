import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { DSOTable } from 'app/pages/invest/components/DSOTable/DSOTable'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import { PromoBanner } from 'app/pages/invest/components/PromoBanner'

jest.mock('app/__tests__/DSO/__tests__/PromotedDSOs', () => ({
  PromotedDSOs: jest.fn(() => null)
}))

jest.mock('app/pages/invest/__tests__/PromoBanner', () => ({
  PromoBanner: jest.fn(() => null)
}))

jest.mock('app/pages/invest/__tests__/DSOTable/DSOTable', () => ({
  DSOTable: jest.fn(() => null)
}))

describe('InvestLanding', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestLanding />)
  })

  it('has a link to Commitments Page', () => {
    const { getByRole } = render(<InvestLanding />)
    expect(
      getByRole('button', { name: /view my commitments/i })
    ).toBeInTheDocument()
  })

  it('renders Promoted DSOs, PromoBanner and DSOTable __tests__', () => {
    render(<InvestLanding />)
    expect(PromotedDSOs).toHaveBeenCalled()
    expect(PromoBanner).toHaveBeenCalled()
    expect(DSOTable).toHaveBeenCalled()
  })
})
