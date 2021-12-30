import { CommitmentsRouter } from 'app/pages/accounts/pages/commitments/router/CommitmentsRouter'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/pages/accounts/pages/commitments/Commitments', () => ({
  Commitments: jest.fn(() => null)
}))

describe('CommitmentsRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CommitmentsRouter />)
  })
})
