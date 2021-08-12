import React from 'react'
import { render, cleanup } from 'test-utils'
import { BannerList } from 'app/pages/admin/components/BannerList'

describe('BannerList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BannerList />)
  })
})
