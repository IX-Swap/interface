import React from 'react'
import { render, cleanup } from 'test-utils'
import { MyDSOsTable } from 'app/pages/issuance/components/MyDSOsTable'

describe('MyDSOsTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<MyDSOsTable />)
  })
})
