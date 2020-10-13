/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { UserDropdown } from 'v2/app/components/UserDropdown/UserDropdown'

describe('UserDropdown', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<UserDropdown />)
  })
})
