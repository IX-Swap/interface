import { NoIdentityView } from 'app/pages/identity/components/NoIdentityView/NoIdentityView'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NoIdentityView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NoIdentityView />)
  })
})
