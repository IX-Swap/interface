import { AdminRouter } from 'app/pages/admin/router/AdminRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AdminRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AdminRouter />)
  })
})
