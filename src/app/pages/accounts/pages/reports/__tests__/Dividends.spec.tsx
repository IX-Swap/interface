import React from 'react'
import { render, cleanup } from 'test-utils'
import { Dividends } from 'app/pages/accounts/pages/reports/Dividends'
import { fakeDividend } from '__fixtures__/reports'
import * as useDividends from 'app/pages/accounts/hooks/useDividends'
import timezoneMock from 'timezone-mock'

describe('Dividends', () => {
  beforeAll(() => {
    timezoneMock.register('US/Pacific')
  })

  afterEach(async () => {
    await cleanup()
    timezoneMock.unregister()
  })

  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useDividends, 'useDividends').mockReturnValue({
      data: undefined,
      isLoading: false
    } as any)

    const { container } = render(<Dividends />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully', () => {
    jest.spyOn(useDividends, 'useDividends').mockReturnValue({
      data: [fakeDividend],
      isLoading: false
    } as any)

    const { container } = render(<Dividends />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data length is 0', () => {
    jest.spyOn(useDividends, 'useDividends').mockReturnValue({
      data: [],
      isLoading: false
    } as any)

    const { container } = render(<Dividends />)
    expect(container).toMatchSnapshot()
  })
})
