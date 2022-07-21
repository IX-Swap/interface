import { BackToDSOButton } from 'app/pages/invest/components/MakeCommitment/BackToDSOButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('BackToDSOButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<BackToDSOButton />)
  })

  it('should match snapshot', () => {
    const { container } = render(<BackToDSOButton />)

    expect(container).toMatchSnapshot()
  })
})
