import { Identities } from 'app/pages/admin/pages/Identities'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Identities', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Identities />)
  })
})
