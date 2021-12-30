import React from 'react'
import { render } from 'test-utils'
import { NoData } from 'app/pages/issuance/components/LineChart/NoData'

describe('NoData', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NoData />)
  })
})
