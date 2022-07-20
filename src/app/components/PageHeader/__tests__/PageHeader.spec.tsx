import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PageHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PageHeader title='Page Title' />)
  })
})
