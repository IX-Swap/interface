import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSPreview } from 'app/components/DSPreview/DSPreview'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import * as useBalancesByTypeHook from 'hooks/balance/useBalancesByType'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { balance } from '__fixtures__/balance'
import { generatePath } from 'react-router-dom'

jest.mock('components/LabelledValue', () => ({
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
})
