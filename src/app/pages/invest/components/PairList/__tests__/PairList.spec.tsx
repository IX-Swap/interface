import { PairList } from 'app/pages/invest/components/PairList/PairList'
import * as useMarketList from 'app/pages/invest/hooks/useMarketList'
import React from 'react'
import { render } from 'test-utils'

describe('PairList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders null when data is undefined', () => {
    const objResponse = {
      data: undefined
    }

    jest
      .spyOn(useMarketList, 'useMarketList')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<PairList />)
    expect(container).toBeEmptyDOMElement()
  })
})
