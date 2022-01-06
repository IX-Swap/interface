import React from 'react'
import { render } from 'test-utils'
import { dso, dsoInsight } from '__fixtures__/authorizer'
import {
  DSORaised,
  DSORaisedProps
} from 'app/pages/invest/components/DSOTable/DSORaised'
import { DSOProgressBar } from 'app/components/DSO/components/DSOProgressBar'

jest.mock('app/components/DSO/components/DSOProgressBar', () => ({
  DSOProgressBar: jest.fn(() => null)
}))

const props: DSORaisedProps = {
  insight: dsoInsight,
  dso: dso
}

describe('DSO Insight', () => {
  it.skip('renders without any errors', () => {
    render(<DSORaised {...props} />)
  })

  it('renders DSOProgressBar correctly if launch date has passed', () => {
    props.dso.launchDate = '11-01-2020'
    render(<DSORaised {...props} />)

    expect(DSOProgressBar).toHaveBeenCalled()
    expect(DSOProgressBar).toHaveBeenCalledWith(
      {
        dso: props.dso
      },
      {}
    )
  })

  it('renders "upcoming" if launch date has not yet passed', () => {
    props.dso.launchDate = '11-01-2300'
    const { getByText } = render(<DSORaised {...props} />)
    expect(getByText('Upcoming')).toBeTruthy()
  })
})
