import React from 'react'
import { render, cleanup } from 'test-utils'
import { RaisedProgressBar, RaisedProgressBarProps } from '../RaisedProgressBar'

const sampleProps: RaisedProgressBarProps = {
  progress: 70
}

describe('Raised Progress Bar', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without any error', () => {
    render(<RaisedProgressBar {...sampleProps} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<RaisedProgressBar {...sampleProps} />)
    expect(getByText('70%')).toBeTruthy()
  })
})
