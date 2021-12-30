import { InvestorLiveOrderBook } from 'app/pages/exchange/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import * as useOrderBook from 'app/pages/exchange/hooks/useOrderBook'
import React from 'react'
import { render } from 'test-utils'

describe('InvestorLiveOrderBook', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders null when data is undefined', () => {
    const objResponse = {
      data: undefined
    }

    jest
      .spyOn(useOrderBook, 'useOrderBook')
      .mockImplementation(() => objResponse as any)
    const { container } = render(
      <InvestorLiveOrderBook tokenSymbol='IXPS' currency='SGD' />
    )
    expect(container).toBeEmptyDOMElement()
  })
})
