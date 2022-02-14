import React from 'react'
import { render } from 'test-utils'
import { Update2fa } from 'app/pages/security/pages/update2fa/Update2fa'

describe('Update2fa', () => {
  it('should match snapshot, does not render Next and Back button if step is 0', () => {
    const { container, queryByText } = render(<Update2fa />)
    expect(container).toMatchSnapshot()
    expect(queryByText('Next')).not.toBeInTheDocument()
    expect(queryByText('Back')).not.toBeInTheDocument()
  })
})
