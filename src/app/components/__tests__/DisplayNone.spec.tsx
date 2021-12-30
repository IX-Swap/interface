import React from 'react'
import { render } from 'test-utils'
import { DisplayNone, DisplayNoneProps } from 'app/components/DisplayNone'

describe('DisplayNone', () => {
  const props: DisplayNoneProps = { when: true }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DisplayNone {...props} />)
  })
})
