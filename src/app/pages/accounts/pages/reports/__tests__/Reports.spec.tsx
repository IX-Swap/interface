import React from 'react'
import { render } from 'test-utils'
import { Reports } from 'app/pages/accounts/pages/reports/Reports'

describe('Reports', () => {
  it('should match snapshot', () => {
    const { container } = render(<Reports />)
    expect(container).toMatchSnapshot()
  })
})
