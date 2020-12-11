import React from 'react'
import { render } from 'test-utils'
import { ChartHeader } from '../ChartHeader'

describe('ChartHeader', () => {
  it('renders without any errors', () => {
    render(<ChartHeader title={'Chart Header'} />)
  })

  it('renders correct props', () => {
    const { getByText } = render(<ChartHeader title={'Chart Header'} />)
    expect(getByText('Chart Header')).toBeTruthy()
  })
})
