import { CapTableRouter } from 'app/pages/issuance/router/CapTableRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CapTableRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CapTableRouter />)
  })
})
