import React from 'react'
import { render, cleanup } from 'test-utils'
import { Dividends } from 'app/pages/accounts/pages/reports/Dividends'

describe('Dividends', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot', () => {
    const { container } = render(<Dividends />)
    expect(container).toMatchSnapshot()
  })
})
