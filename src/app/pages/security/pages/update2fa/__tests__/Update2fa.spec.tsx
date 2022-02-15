import React from 'react'
import { render } from 'test-utils'
import { Update2fa } from 'app/pages/security/pages/update2fa/Update2fa'

describe('Update2fa', () => {
  it('does not render Next and Back button if step is 0, should match snapshot', () => {
    const { container, queryByText } = render(<Update2fa />)
    expect(queryByText('Next')).not.toBeInTheDocument()
    expect(queryByText('Back')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
