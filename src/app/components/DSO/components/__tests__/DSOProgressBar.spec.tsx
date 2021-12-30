import React from 'react'
import { render } from 'test-utils'
import {
  DSOProgressBar,
  DSOProgressBarProps
} from 'app/components/DSO/components/DSOProgressBar'
import { dso } from '__fixtures__/authorizer'
import { BorderLinearProgress } from 'app/components/BorderLinearProgress'

jest.mock('app/components/BorderLinearProgress', () => ({
  BorderLinearProgress: jest.fn(() => null)
}))

describe('DSOProgressBar', () => {
  const props: DSOProgressBarProps = { dso: dso }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSOProgressBar {...props} />)
  })

  it('renders BorderLinearProgress with correct props', () => {
    render(<DSOProgressBar {...props} />)

    expect(BorderLinearProgress).toHaveBeenCalledTimes(1)
  })
})
