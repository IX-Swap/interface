import { NoIdentityCard } from 'app/pages/identity/components/NoIdentityView/NoIdentityCard'
import React from 'react'
import { render } from 'test-utils'

describe('NoIdentityCard', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NoIdentityCard />)
  })
})
