/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { BackButton } from 'v2/app/pages/accounts/pages/banks/components/BackButton'

describe('BackButton', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<BackButton />)
  })
})
