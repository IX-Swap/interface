import { NoOverflowText } from 'app/components/NoOverflowText'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NoOverflowText', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NoOverflowText text='sample string that is long' />)
  })
})
