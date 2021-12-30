import React from 'react'
import { render } from 'test-utils'
import { BannerTable } from 'app/pages/admin/components/BannerTable'

describe('BannerTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<BannerTable banners={[]} />)
  })
})
