import React from 'react'
import { render, cleanup } from 'test-utils'
import { NoData } from 'app/pages/issuance/components/NetAssetValueChart/NoData'

describe('NoData', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NoData />)
  })
})
