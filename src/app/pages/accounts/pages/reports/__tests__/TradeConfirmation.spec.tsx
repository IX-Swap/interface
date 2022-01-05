import React from 'react'
import { render } from 'test-utils'
import { TradeConfirmation } from 'app/pages/accounts/pages/reports/TradeConfirmation'
import { fakeTradeItem } from '__fixtures__/reports'
import * as useTradeConfirmation from 'app/pages/accounts/hooks/useTradeConfirmation'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('TradeConfirmation', () => {
  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useTradeConfirmation, 'useTradeConfirmation').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: false
      })
    )

    const { container } = render(<TradeConfirmation />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully', () => {
    jest.spyOn(useTradeConfirmation, 'useTradeConfirmation').mockReturnValue(
      generateQueryResult({
        data: [fakeTradeItem],
        isLoading: false
      })
    )

    const { container } = render(<TradeConfirmation />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data length is 0', () => {
    jest.spyOn(useTradeConfirmation, 'useTradeConfirmation').mockReturnValue(
      generateQueryResult({
        data: [],
        isLoading: false
      })
    )

    const { container } = render(<TradeConfirmation />)
    expect(container).toMatchSnapshot()
  })
})
