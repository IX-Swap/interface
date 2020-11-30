import React from 'react'
import { render, cleanup } from 'test-utils'
import { DisplayNone, DisplayNoneProps } from 'v2/app/components/DisplayNone'

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
