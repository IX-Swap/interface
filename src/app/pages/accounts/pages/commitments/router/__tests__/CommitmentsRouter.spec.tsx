import { CommitmentsRouter } from 'app/pages/accounts/pages/commitments/router/CommitmentsRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('app/pages/accounts/pages/commitments/Commitments', () => ({
  Commitments: jest.fn(() => null)
}))

describe('CommitmentsRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CommitmentsRouter />)
  })
})
