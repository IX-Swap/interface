import {
  Security,
  SecurityCard
} from 'app/pages/home/components/Securities/SecurityCard'
import { HomeRoute } from 'app/pages/home/router/config'
import { stringTruncate } from 'config/utils'
import React from 'react'
import { generatePath } from 'react-router-dom'
import { render, cleanup } from 'test-utils'

export const sampleSecurity: Security = {
  amountRaised: '$63,999',
  assetClass: 'Equity',
  country: 'United States',
  currentPrice: 81,
  description:
    '3432 Harding St. is a single-family home in the East Village neighborhood of Detroit, MI. This 1,452 square foot house sits on a 4,356 square foot lot and features 3 bedrooms and 1 bathroom. Harding also features hardwood floors, a gabled roof, and unique wood siding with flashy paintwork!  The East Village neighborhood is a very residential neighborhood that also enjoys plenty of local restaurants, parks, and places of worship.  Nearby schools include Southeastern High School, Hutchinson Elementary-Middle School, and Timbuktu Academy of Science and Technology.',
  exchange: 'Uniswap',
  firm: '3432 Harding Street, Detroit, MI, 48214',
  fundingGoal: '$63,999',
  industry: 'Real Estate',
  issuanceDate: '2020-08-31',
  issuancePlatform: 'RealT',
  issuePrice: '$49.23',
  logo: {
    publicUrl:
      'https://assets.atlasone-staging.ca/uploads/5fd94af5847528002fb70f32-REALT.png'
  },
  marketCapitalization: 0,
  oneYearAverageDailyVolume: 1,
  oneYearAveragePrice: 2,
  oneYearHighPrice: 3,
  oneYearLowPrice: 4,
  oneYearMedianPrice: 5,
  priceChange1Month: 9,
  priceChange1Week: 8,
  priceChange1Year: 7,
  priceChange24Hours: 6,
  priceChangeYTD: 10,
  protocol: 'ERC-20',
  reserved: '100',
  ticker: 'REALTOKEN-S-3432-HARDING-ST-DETROIT-MI',
  tokenSupply: '1300',
  tokensOffered: '1200',
  website: 'https://realt.co/product/3432-harding-street-detroit-mi-48214/'
}

describe('SecurityCard', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecurityCard {...sampleSecurity} />)
  })

  it('renders path correctly', () => {
    const { container } = render(<SecurityCard {...sampleSecurity} />)
    const link = container.querySelector('a') as HTMLAnchorElement

    expect(link).toHaveAttribute(
      'href',
      generatePath(HomeRoute.security, {
        ticker: 'REALTOKEN-S-3432-HARDING-ST-DETROIT-MI'
      })
    )
  })

  it('renders logo correctly', () => {
    const { container } = render(<SecurityCard {...sampleSecurity} />)
    const logo = container.querySelector('img') as HTMLImageElement

    expect(logo).toHaveAttribute(
      'src',
      'https://assets.atlasone-staging.ca/uploads/5fd94af5847528002fb70f32-REALT.png'
    )
    expect(logo).toHaveAttribute(
      'alt',
      'REALTOKEN-S-3432-HARDING-ST-DETROIT-MI'
    )
  })

  it('renders logo as null when logo is undefined', () => {
    const { container } = render(
      <SecurityCard {...sampleSecurity} logo={undefined} />
    )
    const logo = container.querySelector('img')
    expect(logo).toBeFalsy()
  })

  it('renders currentPrice correctly', () => {
    const { getByText } = render(<SecurityCard {...sampleSecurity} />)

    expect(getByText('$ 81.00')).toBeTruthy()
  })

  it('renders priceChange24Hours correctly', () => {
    const { getByText } = render(<SecurityCard {...sampleSecurity} />)

    expect(getByText('6%')).toBeTruthy()
  })

  it('renders description correctly', () => {
    const { getByText } = render(<SecurityCard {...sampleSecurity} />)

    expect(
      getByText(
        stringTruncate(
          '3432 Harding St. is a single-family home in the East Village neighborhood of Detroit, MI. This 1,452 square foot house sits on a 4,356 square foot lot and features 3 bedrooms and 1 bathroom. Harding also features hardwood floors, a gabled roof, and unique wood siding with flashy paintwork!  The East Village neighborhood is a very residential neighborhood that also enjoys plenty of local restaurants, parks, and places of worship.  Nearby schools include Southeastern High School, Hutchinson Elementary-Middle School, and Timbuktu Academy of Science and Technology.',
          190
        )
      )
    ).toBeTruthy()
  })
})
