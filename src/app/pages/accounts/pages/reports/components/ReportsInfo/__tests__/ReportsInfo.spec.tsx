import React from 'react'
import { render, cleanup } from 'test-utils'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import * as useGetAccountInfo from 'app/pages/accounts/hooks/useGetAccountInfo'
import { fakeAccountInfo } from '__fixtures__/reports'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('ReportsInfo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders loading indicator component when data is loading', () => {
    jest.spyOn(useGetAccountInfo, 'useGetAccountInfo').mockReturnValue({
      data: fakeAccountInfo,
      isLoading: true
    } as any)

    render(<ReportsInfo />)

    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders empty component when data is undefined', () => {
    jest.spyOn(useGetAccountInfo, 'useGetAccountInfo').mockReturnValue({
      data: undefined,
      isLoading: false
    } as any)

    const { container } = render(<ReportsInfo />)

    expect(LoadingIndicator).toHaveBeenCalledTimes(0)
    expect(container).toBeEmptyDOMElement()
  })
})
