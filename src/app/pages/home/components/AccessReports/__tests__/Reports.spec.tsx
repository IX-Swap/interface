import { Reports } from 'app/pages/home/components/AccessReports/Reports'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Reports', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Reports />)
  })
})
