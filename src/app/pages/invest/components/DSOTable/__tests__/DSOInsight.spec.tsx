import React from 'react'
import { render } from 'test-utils'
import { dso, dsoInsight } from '__fixtures__/authorizer'
import { DSOInsight, DSOInsightProps } from '../DSOInsight'

const sampleProps: DSOInsightProps = {
  insight: dsoInsight,
  dso: dso
}

describe('DSO Insight', () => {
  it('renders without any errors', () => {
    render(<DSOInsight {...sampleProps} />)
  })

  it('renders progress bar if launch date has passed', () => {
    sampleProps.dso.launchDate = '11-01-2020'
    const { getByTestId } = render(<DSOInsight {...sampleProps} />)
    expect(getByTestId('progress-bar')).toBeTruthy()
  })

  it('renders progress bar if launch date has not yet passed', () => {
    sampleProps.dso.launchDate = '11-01-2300'
    const { getByText } = render(<DSOInsight {...sampleProps} />)
    expect(getByText('Upcomming')).toBeTruthy()
  })
})
