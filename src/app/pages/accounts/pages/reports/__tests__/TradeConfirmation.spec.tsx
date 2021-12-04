import React from 'react'
import { render, cleanup } from 'test-utils'
import { TradeConfirmation } from 'app/pages/accounts/pages/reports/TradeConfirmation'
import { fakeTradeItem } from '__fixtures__/reports'
import * as useTradeConfirmation from 'app/pages/accounts/hooks/useTradeConfirmation'

describe('TradeConfirmation', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useTradeConfirmation, 'useTradeConfirmation').mockReturnValue({
      data: undefined,
      isLoading: false
    } as any)

    const { container } = render(<TradeConfirmation />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully', () => {
    jest.spyOn(useTradeConfirmation, 'useTradeConfirmation').mockReturnValue({
      data: [fakeTradeItem],
      isLoading: false
    } as any)

    const { container } = render(<TradeConfirmation />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data length is 0', () => {
    jest.spyOn(useTradeConfirmation, 'useTradeConfirmation').mockReturnValue({
      data: [],
      isLoading: false
    } as any)

    const { container } = render(<TradeConfirmation />)
    expect(container).toMatchSnapshot()
  })
})
