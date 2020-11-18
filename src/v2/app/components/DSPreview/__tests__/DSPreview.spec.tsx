import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSPreview } from 'v2/app/components/DSPreview/DSPreview'
import { history } from 'v2/history'
import { DSRoute } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { LabelledValue } from 'v2/components/LabelledValue'
import * as useBalancesByTypeHook from 'v2/hooks/balance/useBalancesByType'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { balance } from '__fixtures__/balance'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSPreview', () => {
  beforeEach(() => {
    history.push(DSRoute.view, { balanceId: 'testBalanceId' })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<DSPreview />)
  })

  it('renders nothing if loading', () => {
    jest.spyOn(useBalancesByTypeHook, 'useBalancesByType').mockReturnValue(
      generateInfiniteQueryResult({
        map: { testBalanceId: balance },
        isLoading: true
      })
    )
    const { container } = render(<DSPreview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders LabelledValue with correct props', () => {
    jest
      .spyOn(useBalancesByTypeHook, 'useBalancesByType')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testBalanceId: balance } })
      )
    render(<DSPreview />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Digital Security Name', value: balance.name },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Symbol', value: balance.symbol },
      {}
    )
  })
})
