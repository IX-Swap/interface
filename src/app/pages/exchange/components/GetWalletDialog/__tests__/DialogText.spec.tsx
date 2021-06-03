import React from 'react'
import { render, cleanup } from 'test-utils'

import { DialogText } from '../DialogText'

describe('DialogText', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DialogText />)
  })
})
