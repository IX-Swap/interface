import React from 'react'
import { render, cleanup } from 'test-utils'
import { Dividends } from 'app/pages/accounts/pages/reports/Dividends'
import { fakeDividend } from '__fixtures__/reports'
import * as useDividends from 'app/pages/accounts/hooks/useDividends'

describe('Dividends', () => {
  afterEach(async () => {
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
    jest
      .spyOn(Date.prototype, 'toLocaleTimeString')
      .mockImplementation(() => '12:00:00')
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
