import React from 'react'
import { render } from 'test-utils'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

describe('PageHeader', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<PageHeader />)
  })
})
