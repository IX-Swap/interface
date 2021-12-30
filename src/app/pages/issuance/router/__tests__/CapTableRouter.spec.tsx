import { CapTableRouter } from 'app/pages/issuance/router/CapTableRouter'
import React from 'react'
import { render } from 'test-utils'

describe('CapTableRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CapTableRouter />)
  })
})
