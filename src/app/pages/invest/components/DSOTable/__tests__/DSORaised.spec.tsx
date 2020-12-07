import React from 'react'
import { render } from 'test-utils'
import { dso, dsoInsight } from '__fixtures__/authorizer'
import { DSORaised, DSOInsightProps } from '../DSORaised'

const sampleProps: DSOInsightProps = {
  insight: dsoInsight,
  dso: dso
}

describe('DSO Insight', () => {
  it('renders without any errors', () => {
    render(<DSORaised {...sampleProps} />)
  })

  it('renders progress bar if launch date has passed', () => {
    sampleProps.dso.launchDate = '11-01-2020'
    const { getByTestId } = render(<DSORaised {...sampleProps} />)
    expect(getByTestId('progress-bar')).toBeTruthy()
  })

  it('renders progress bar if launch date has not yet passed', () => {
    sampleProps.dso.launchDate = '11-01-2300'
    const { getByText } = render(<DSORaised {...sampleProps} />)
    expect(getByText('Upcomming')).toBeTruthy()
  })
})
