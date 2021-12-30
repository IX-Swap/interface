import React from 'react'
import { render } from 'test-utils'
import { Copyright } from 'auth/components/Copyright'

describe('Copyright', () => {
  it.skip('renders with copyright text', () => {
    const expectedText = '© 2020 InvestaX, All rights reserved.'
    const { container } = render(<Copyright />)

    expect(container).toHaveTextContent(expectedText)
  })
})
