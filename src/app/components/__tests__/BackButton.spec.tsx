import React from 'react'
import { render } from 'test-utils'
import { BackButton } from 'app/components/BackButton'

describe('BackButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<BackButton />)
  })
})
