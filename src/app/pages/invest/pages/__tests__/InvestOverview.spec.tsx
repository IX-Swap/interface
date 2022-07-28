import React from 'react'
import { render } from 'test-utils'
import { InvestOverview } from 'app/pages/invest/pages/InvestOverview'

describe('InvestOverview', () => {
  it('should match snapshot', () => {
    const { container } = render(<InvestOverview />)
    expect(container).toMatchSnapshot()
  })
})
