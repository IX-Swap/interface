import React from 'react'
import { render } from 'test-utils'
import { CountdownTimer } from '../CountdownTimer'

describe('CountdownTimer', () => {
  const dateNowSpy = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => 1607672045419)
  const launchDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)

  afterAll(() => {
    dateNowSpy.mockRestore()
  })

  it('renders without errors', () => {
    render(<CountdownTimer launchDate={launchDate} />)
  })

  it('renders correct start time', () => {
    const { getByText, findAllByText } = render(
      <CountdownTimer launchDate={launchDate} />
    )
    expect(getByText('02')).toBeTruthy()
    expect(findAllByText('00')).toBeTruthy()
  })
})
