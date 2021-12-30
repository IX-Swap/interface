import { CreateCorporateAsAdmin } from 'app/pages/admin/pages/CreateCorporateAsAdmin'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateInvestorForm',
  () => ({
    AdminCorporateInvestorForm: jest.fn(() => null)
  })
)

describe('CreateCorporateAsAdmin', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CreateCorporateAsAdmin />)
  })
})
