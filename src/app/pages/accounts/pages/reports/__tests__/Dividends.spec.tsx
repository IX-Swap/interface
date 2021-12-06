import React from 'react'
import { render, cleanup } from 'test-utils'
import { Dividends } from 'app/pages/accounts/pages/reports/Dividends'
import { fakeDividend } from '__fixtures__/reports'
import * as useDividends from 'app/pages/accounts/hooks/useDividends'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('Dividends', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useDividends, 'useDividends').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: false
      })
    )

    const { container } = render(<Dividends />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully', () => {
    jest.spyOn(useDividends, 'useDividends').mockReturnValue(
      generateQueryResult({
        data: [fakeDividend],
        isLoading: false
      })
    )

    const { container } = render(<Dividends />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data length is 0', () => {
    jest.spyOn(useDividends, 'useDividends').mockReturnValue(
      generateQueryResult({
        data: [],
        isLoading: false
      })
    )

    const { container } = render(<Dividends />)
    expect(container).toMatchSnapshot()
  })
})
