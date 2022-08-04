import { NoBalance } from 'app/pages/invest/components/MakeCommitment/NoBalance'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NoBalance', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NoBalance />)
  })

  it('should match snapshot', () => {
    const { container } = render(<NoBalance />)

    expect(container).toMatchSnapshot()
  })
})
