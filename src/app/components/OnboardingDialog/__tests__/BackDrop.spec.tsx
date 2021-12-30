import React from 'react'
import { render } from 'test-utils'
import { BackDrop } from 'app/components/OnboardingDialog/BackDrop'

describe('BackDrop', () => {
  const click = jest.fn()
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<BackDrop onClick={click} opened={true} />)
  })
})
