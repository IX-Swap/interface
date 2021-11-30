import React from 'react'
import { render, cleanup } from 'test-utils'
import { AccountsSummary } from 'app/pages/accounts/pages/reports/AccountsSummary'

describe('AccountsSummary', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot', () => {
    const { container } = render(<AccountsSummary />)
    expect(container).toMatchSnapshot()
  })
})
