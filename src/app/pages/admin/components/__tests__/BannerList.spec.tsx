import React from 'react'
import { render } from 'test-utils'
import { BannerList } from 'app/pages/admin/components/BannerList'

describe('BannerList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<BannerList />)
  })
})
