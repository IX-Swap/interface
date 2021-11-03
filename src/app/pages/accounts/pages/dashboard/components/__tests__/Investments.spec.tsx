import React from 'react'
import { render, cleanup } from 'test-utils'
import { Investments } from 'app/pages/accounts/pages/dashboard/components/Investments/Investments'
import { formatAmount } from 'helpers/numbers'

const primaryInvestment = 1000
const secondaryInvestment = 2000

describe('Investments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Investments primary={primaryInvestment} />)
  })

  it('renders title with correct text', () => {
    const { getByText } = render(<Investments primary={primaryInvestment} />)
    expect(getByText('Investments')).toBeInTheDocument()
  })

  it('renders investments info with correct content', () => {
    const { getByTestId } = render(
      <Investments
        primary={primaryInvestment}
        secondary={secondaryInvestment}
      />
    )

    expect(getByTestId('primary-investment')).toHaveTextContent(
      `Primary:US$ ${formatAmount(primaryInvestment)}`
    )
    expect(getByTestId('secondary-investment')).toHaveTextContent(
      `Secondary:US$ ${formatAmount(secondaryInvestment)}`
    )
  })
})
