import React from 'react'
import { render } from 'test-utils'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { DSOTable } from 'app/pages/invest/components/DSOTable/DSOTable'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'

jest.mock('app/components/DSO/components/PromotedDSOs', () => ({
  PromotedDSOs: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/DSOTable/DSOTable', () => ({
  DSOTable: jest.fn(() => null)
}))

describe('InvestLanding', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('has a link to Investments Page', () => {
    const { getByRole } = render(<InvestLanding />)
    expect(
      getByRole('link', { name: /view my investments/i })
    ).toBeInTheDocument()
  })

  it('renders Promoted DSOs, PromoBanner and DSOTable components', () => {
    render(<InvestLanding />)
    expect(PromotedDSOs).toHaveBeenCalled()
    expect(DSOTable).toHaveBeenCalled()
  })
})
