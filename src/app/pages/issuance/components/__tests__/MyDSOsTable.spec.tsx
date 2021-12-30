import React from 'react'
import { render } from 'test-utils'
import { MyDSOsTable } from 'app/pages/issuance/components/MyDSOsTable'

describe('MyDSOsTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<MyDSOsTable />)
  })
})
