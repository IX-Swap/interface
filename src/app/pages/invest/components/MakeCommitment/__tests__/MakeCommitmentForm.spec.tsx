import { MakeCommitmentForm } from 'app/pages/invest/components/MakeCommitment/MakeCommitmentForm'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('MakeCommitmentForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MakeCommitmentForm dso={dso} />)
  })

  it('should match snapshot', () => {
    const { container } = render(<MakeCommitmentForm dso={dso} />)

    expect(container).toMatchSnapshot()
  })
})
