import React from 'react'
import { render, cleanup } from 'test-utils'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'

jest.mock('__tests__/AppRouterLink', () => ({
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
