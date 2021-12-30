import React from 'react'
import { render } from 'test-utils'
import { BannerForm } from 'app/pages/admin/components/BannerForm'

describe('BannerForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<BannerForm />)
  })
})
