import React from 'react'
import { render, cleanup } from 'test-utils'
import { BackDrop } from 'app/components/OnboardingDialog/BackDrop'

describe('BackDrop', () => {
  const click = jest.fn()
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<BackDrop onClick={click} opened={true} />)
  })
})
