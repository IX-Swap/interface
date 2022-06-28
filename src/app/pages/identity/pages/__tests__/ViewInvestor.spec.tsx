import React from 'react'
import { render } from 'test-utils'
import { ViewInvestor } from 'app/pages/identity/pages/ViewInvestor/ViewInvestor'

describe('ViewInvestor', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<ViewInvestor />)
    expect(container).toMatchSnapshot()
  })
})
