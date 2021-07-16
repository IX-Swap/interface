import {
  Security,
  SecurityCard
} from 'app/pages/home/components/Securities/SecurityCard'
import React from 'react'
import { render, cleanup } from 'test-utils'

export const sampleSecurity: Security = {
  assetClass: 'Investment Fund',
  country: 'Belarus',
  currentPrice: 23,
  description:
    'Jinbi token holders can enjoy the benefits of both gold and cryptocurrencies in a secure environment. Jinbi Token holders will benefit directly and share in the profitability from the production of Gold at source. Jinbi will create liquidity events following production milestones whereby each coin holder has the option to exchange their tokens for physical gold coins. All other funds are reinvested back into Jinbi to continue further Gold production.',
  firm: 'Jinbi',
  fundingGoal: '$12,500,000.00',
  industry: 'Finance',
  issuePrice: '$7.04',
  logo: { publicUrl: '5fd94875847528002fb70f15.png' },
  priceChange24Hours: 1.2,
  ticker: 'JINBI',
  status: 'funded',
  website: 'https://jinbitoken.io/en/#jinbi-token',
  totalCapitalization: '$12,500,000.00'
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
