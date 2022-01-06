import React from 'react'
import {
  TimeDisplay,
  TimeDisplayProps
} from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { render } from 'test-utils'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('TimeDisplay', () => {
  const timeDisplayProps: TimeDisplayProps = {
    unitsToDisplay: ['days', 'hours', 'minutes'],
    units: {
      years: 0,
      months: 0,
      days: 9,
      hours: 18,
      minutes: 15,
      seconds: 45
    }
  }

  it.skip('renders without any errors', () => {
    render(<TimeDisplay {...timeDisplayProps} />)
  })

  it('renders time units correctly', () => {
    const { getByText, queryByText } = render(
      <TimeDisplay {...timeDisplayProps} />
    )
    expect(getByText('09')).toBeInTheDocument()
    expect(getByText(/days/i)).toBeInTheDocument()
    expect(getByText('18')).toBeInTheDocument()
    expect(getByText(/hours/i)).toBeInTheDocument()
    expect(getByText('15')).toBeInTheDocument()
    expect(getByText(/minutes/i)).toBeInTheDocument()
    expect(queryByText('45')).not.toBeInTheDocument()
    expect(queryByText(/seconds/i)).not.toBeInTheDocument()
    expect(queryByText(/years/i)).not.toBeInTheDocument()
    expect(queryByText(/months/i)).not.toBeInTheDocument()
  })

  it('renders spacers between TimeUnit components when isNewThemeOn is true', () => {
    const { getAllByTestId } = render(
      <TimeDisplay {...timeDisplayProps} isNewThemeOn={true} />
    )
    const spacers = getAllByTestId('spacer')
    expect(spacers.length).toEqual(timeDisplayProps.unitsToDisplay.length - 1)
  })
})
