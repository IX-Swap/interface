import { NoIdentityCard } from 'app/pages/identity/components/NoIdentityView/NoIdentityCard'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NoIdentityCard', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NoIdentityCard />)
  })
})
