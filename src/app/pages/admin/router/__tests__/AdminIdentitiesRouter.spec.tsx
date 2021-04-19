import { AdminIdentitiesRouter } from 'app/pages/admin/router/AdminIdentitiesRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AdminIdentitiesRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AdminIdentitiesRouter />)
  })
})
