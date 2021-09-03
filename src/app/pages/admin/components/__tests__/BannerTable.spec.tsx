import React from 'react'
import { render, cleanup } from 'test-utils'
import { BannerTable } from 'app/pages/admin/components/BannerTable'

describe('BannerTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BannerTable banners={[]} />)
  })
})
