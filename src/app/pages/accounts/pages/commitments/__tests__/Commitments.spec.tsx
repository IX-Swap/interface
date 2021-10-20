import { Commitments } from 'app/pages/accounts/pages/commitments/Commitments'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('app/pages/accounts/components/Commitments/CommitmentsTable', () => ({
  CommitmentsTable: jest.fn(() => null)
}))

describe('Commitments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Commitments />)
  })
})
