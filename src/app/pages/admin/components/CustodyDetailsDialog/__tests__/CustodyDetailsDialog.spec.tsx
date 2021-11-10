import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodyDetailsDialog } from 'app/pages/admin/components/CustodyDetailsDialog/CustodyDetailsDialog'

describe('CustodyDetailsDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodyDetailsDialog />)
  })
})
