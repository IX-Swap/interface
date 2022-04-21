import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  PrimaryInvestLink,
  PrimaryInvestLinkProps
} from 'app/pages/invest/components/OTCMarketCard/PrimaryInvestLink'

describe('PrimaryInvestLink', () => {
  const primaryProps: PrimaryInvestLinkProps = {
    type: 'Primary',
    data: dso
  }

  const OTCProps: PrimaryInvestLinkProps = {
    type: 'OTC',
    data: dso
  }
  const TopOffersProps: PrimaryInvestLinkProps = {
    type: 'Primary',
    data: dso
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Button with correct props when type is Primary', () => {
    const { getByTestId } = render(<PrimaryInvestLink {...primaryProps} />)

    const button = getByTestId('otc-card-link')

    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('disabled')
    expect(button).toHaveTextContent('Invest')
  })

  it('renders Button with correct props when type is Primary', () => {
    const { getByTestId } = render(<PrimaryInvestLink {...TopOffersProps} />)

    const button = getByTestId('otc-card-link')

    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('disabled')
    expect(button).toHaveTextContent('Invest')
  })

  it('renders Button with correct props when type is OTC', () => {
    const { getByTestId } = render(<PrimaryInvestLink {...OTCProps} />)

    const button = getByTestId('otc-card-link')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('disabled')
    expect(button).toHaveTextContent('Trade')
  })
})
