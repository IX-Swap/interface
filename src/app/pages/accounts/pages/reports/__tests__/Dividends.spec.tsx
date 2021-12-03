import React from 'react'
import { render, cleanup } from 'test-utils'
import { Dividends } from 'app/pages/accounts/pages/reports/Dividends'
import { fakeDividend } from '__fixtures__/reports'
import * as useDividends from 'app/pages/accounts/hooks/useDividends'

describe('Dividends', () => {
  const RealDate = Date
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-22T10:20:30Z').getTime())
  })

  afterEach(async () => {
    global.Date = RealDate
    await cleanup()
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
