import React from 'react'
import { render } from 'test-utils'
import { Enabled } from 'app/pages/security/pages/setup2fa/components/Enabled'

describe('Enabled', () => {
  it('should match snapshot', () => {
    const { container } = render(<Enabled />)
    expect(container).toMatchSnapshot()
  })
})
