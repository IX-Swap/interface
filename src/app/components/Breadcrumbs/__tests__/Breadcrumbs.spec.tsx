import React from 'react'
import { render } from 'test-utils'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('Breadcrumbs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Breadcrumbs />)
  })
})
