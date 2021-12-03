import React from 'react'
import { render, cleanup } from 'test-utils'
import { AccountsSummary } from 'app/pages/accounts/pages/reports/AccountsSummary'
import * as useActivitySummary from 'app/pages/accounts/hooks/useActivitySummary'
import { fakeActivitySummary } from '__fixtures__/reports'
import timezoneMock from 'timezone-mock'

describe('AccountsSummary', () => {
  beforeAll(() => {
    timezoneMock.register('UTC')
  })

  afterEach(async () => {
    await cleanup()
    timezoneMock.unregister()
  })

  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue({
      data: undefined,
      isLoading: false
    } as any)

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when all data is loaded successfully', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue({
      data: fakeActivitySummary,
      isLoading: false
    } as any)

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and openPositions is empty array', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue({
      data: { fakeActivitySummary, openPositions: [] },
      isLoading: false
    } as any)

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and fakeCashReports is empty array', () => {
    jest.spyOn(useActivitySummary, 'useActivitySummary').mockReturnValue({
      data: { fakeActivitySummary, cashReports: [] },
      isLoading: false
    } as any)

    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })
})
