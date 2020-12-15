import React from 'react'
import { render, cleanup } from 'test-utils'
import { DisplayNone, DisplayNoneProps } from 'app/components/DisplayNone'

describe('DisplayNone', () => {
  const props: DisplayNoneProps = { when: true }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DisplayNone {...props} />)
  })
})
