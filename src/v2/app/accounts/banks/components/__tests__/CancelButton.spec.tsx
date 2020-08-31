/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CancelButton } from '../CancelButton'

describe('CancelButton', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<CancelButton />)
  })
})
