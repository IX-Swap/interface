/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import { CreateBank } from 'v2/app/pages/accounts/pages/banks/CreateBank/CreateBank'

describe('CreateBank', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CreateBank />)
  })
})
