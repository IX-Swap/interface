import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSPreview } from 'app/components/DSPreview/DSPreview'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { LabelledValue } from 'components/LabelledValue'
import * as useBalancesByTypeHook from 'hooks/balance/useBalancesByType'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { balance } from '__fixtures__/balance'
import { generatePath, Route } from 'react-router-dom'

jest.mock('__tests__/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSPreview', () => {
  const balanceId = 'testBalanceId'

  beforeEach(() => {
    history.push(generatePath(DSRoute.withdraw, { balanceId }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

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

    render(
      <Route path={DSRoute.withdraw}>
        <DSPreview />
      </Route>
    )

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
