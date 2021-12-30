import { Identities } from 'app/pages/admin/pages/Identities'
import React from 'react'
import { render } from 'test-utils'

describe('Identities', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Identities />)
  })
})
