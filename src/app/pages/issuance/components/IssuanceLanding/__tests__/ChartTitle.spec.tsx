import React from 'react'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { render } from 'test-utils'

describe('ChartTitle', () => {
  it.skip('renders without errors', () => {
    render(<ChartTitle title='Test Title' />)
  })

  it('renders title correctly', () => {
    const { getByText } = render(<ChartTitle title='Test Title' />)
    expect(getByText(/test title/i)).toBeTruthy()
  })
})
