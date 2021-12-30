import { CreateIndividualAsAdmin } from 'app/pages/admin/pages/CreateIndividualAsAdmin'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualInvestorForm',
  () => ({
    AdminIndividualInvestorForm: jest.fn(() => null)
  })
)

describe('CreateIndividualAsAdmin', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CreateIndividualAsAdmin />)
  })
})
