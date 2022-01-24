import React from 'react'
import { render, cleanup } from 'test-utils'
import { AccountsSummary } from 'app/pages/accounts/pages/reports/AccountsSummary'
import * as useActivitySummary from 'app/pages/accounts/hooks/useActivitySummary'
import { fakeActivitySummary } from '__fixtures__/reports'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('AccountsSummary', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: false
      })
    )

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when all data is loaded successfully', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue(
      generateQueryResult({
        data: fakeActivitySummary,
        isLoading: false
      })
    )

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and openPositions is empty array', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue(
      generateQueryResult({
        data: { fakeActivitySummary, openPositions: [] },
        isLoading: false
      })
    )

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and fakeCashReports is empty array', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue(
      generateQueryResult({
        data: { fakeActivitySummary, cashReports: [] },
        isLoading: false
      })
    )

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })
})
