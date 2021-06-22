import React from 'react'
import { render, cleanup } from 'test-utils'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

describe('PageHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<PageHeader />)
  })
})
