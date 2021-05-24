import { PairSelect } from 'app/pages/exchange/market/components/PairSelect/PairSelect'
import * as useMarketList from 'app/pages/exchange/market/hooks/useMarketList'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('PairSelect', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({})
    jest
      .spyOn(useMarketList, 'useMarketList')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairSelect />)
  })
})
