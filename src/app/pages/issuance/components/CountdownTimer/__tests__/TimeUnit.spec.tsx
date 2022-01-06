import React from 'react'
import {
  TimeUnit,
  TimeUnitProps
} from 'app/pages/issuance/components/CountdownTimer/TimeUnit'
import { render } from 'test-utils'

describe('TimeUnit', () => {
  const timeUnitProps: TimeUnitProps = {
    time: 2,
    label: 'years'
  }

  it.skip('renders without any errors', () => {
    render(<TimeUnit {...timeUnitProps} />)
  })

  it('renders correct time and label value', () => {
    const { getByText } = render(<TimeUnit {...timeUnitProps} />)
    expect(getByText('02')).toBeInTheDocument()
    expect(getByText(/years/i)).toBeInTheDocument()
  })
})
