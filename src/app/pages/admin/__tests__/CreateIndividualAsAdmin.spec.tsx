import { CreateIndividualAsAdmin } from 'app/pages/admin/pages/CreateIndividualAsAdmin'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualInvestorForm',
  () => ({
    AdminIndividualInvestorForm: jest.fn(() => null)
  })
)

describe('CreateIndividualAsAdmin', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreateIndividualAsAdmin />)
  })
})
