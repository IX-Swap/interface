import React from 'react'
import { render, cleanup } from 'test-utils'
import { TotalInvestors } from 'app/pages/issuance/components/CapTable/TotalInvestors'
import * as useTotalInvestorsHook from 'app/pages/issuance/hooks/useTotalInvestors'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { generateQueryResult } from '__fixtures__/useQuery'

jest.mock('app/pages/issuance/components/IssuanceLanding/InsightValue', () => ({
  InsightValue: jest.fn(() => null)
}))

describe('TotalInvestors', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useTotalInvestorsHook, 'useTotalInvestors')
      .mockReturnValue(generateQueryResult({ data: {} }))

    render(<TotalInvestors />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useTotalInvestorsHook, 'useTotalInvestors')
      .mockReturnValue(generateQueryResult({ isLoading: true }))

    const { container } = render(<TotalInvestors />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders InsightValue correctly', () => {
    jest
      .spyOn(useTotalInvestorsHook, 'useTotalInvestors')
      .mockReturnValue(
        generateQueryResult({ data: { weekTotal: 1, total: 4 } })
      )

    render(<TotalInvestors />)

    expect(InsightValue).toHaveBeenCalled()
    expect(InsightValue).toHaveBeenCalledWith({ value: 4 }, {})
  })
})
