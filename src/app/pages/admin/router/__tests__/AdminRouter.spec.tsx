import { AdminRouter } from 'app/pages/admin/router/AdminRouter'
import React from 'react'
import { render } from 'test-utils'

describe('AdminRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AdminRouter />)
  })
})
