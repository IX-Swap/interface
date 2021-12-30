import React from 'react'
import { render } from 'test-utils'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'

jest.mock('app/pages/issuance/components/IssuanceLanding/ChartTitle', () => ({
  ChartTitle: jest.fn(() => null)
}))

describe('ChartWrapper', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ChartWrapper title='test title' small />)
  })

  it('renders ChartTitle with correct props', () => {
    render(<ChartWrapper title='test title' small />)
    expect(ChartTitle).toHaveBeenNthCalledWith(
      1,
      { title: 'test title', small: true },
      {}
    )
  })
})
