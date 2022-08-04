import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OverviewValue', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OverviewValue label='Item Label' value='123' />)
  })

  it('should match snapshot', () => {
    const { container } = render(
      <OverviewValue label='Item Label' value='123' />
    )

    expect(container).toMatchSnapshot()
  })
})
