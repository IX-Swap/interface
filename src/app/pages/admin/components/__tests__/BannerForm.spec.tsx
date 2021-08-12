import React from 'react'
import { render, cleanup } from 'test-utils'
import { BannerForm } from 'app/pages/admin/components/BannerForm'

describe('BannerForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BannerForm />)
  })
})
