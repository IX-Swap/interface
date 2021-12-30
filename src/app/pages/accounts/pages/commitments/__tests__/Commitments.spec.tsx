import { Commitments } from 'app/pages/accounts/pages/commitments/Commitments'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/pages/accounts/components/Commitments/CommitmentsTable', () => ({
  CommitmentsTable: jest.fn(() => null)
}))

describe('Commitments', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Commitments />)
  })
})
