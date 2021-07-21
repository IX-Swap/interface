import {
  Security,
  SecurityCard
} from 'app/pages/home/components/Securities/SecurityCard'
import React from 'react'
import { render, cleanup } from 'test-utils'

export const sampleSecurity: Security = {
  amountRaised: '$63,999',
  assetClass: 'Equity',
  country: 'United States',
  currentPrice: null,
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
  oneYearAverageDailyVolume: null,
  oneYearAveragePrice: null,
  oneYearHighPrice: null,
  oneYearLowPrice: null,
  oneYearMedianPrice: null,
  priceChange1Month: 0,
  priceChange1Week: 0,
  priceChange1Year: 0,
  priceChange24Hours: null,
  priceChangeYTD: 0,
  protocol: 'ERC-20',
  reserved: '0',
  ticker: 'REALTOKEN-S-3432-HARDING-ST-DETROIT-MI',
  tokenSupply: '1300',
  tokensOffered: '1300',
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
})
