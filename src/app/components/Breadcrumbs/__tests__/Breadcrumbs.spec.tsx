import React from 'react'
import { render, cleanup } from 'test-utils'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('Breadcrumbs', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Breadcrumbs />)
  })
})
