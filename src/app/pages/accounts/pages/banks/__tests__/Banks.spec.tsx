import React from 'react'
import { render } from 'test-utils'
import { Banks } from 'app/pages/accounts/pages/banks/Banks'

describe('Banks', () => {
  it('renders without error', () => {
    render(<Banks />)
  })
})
