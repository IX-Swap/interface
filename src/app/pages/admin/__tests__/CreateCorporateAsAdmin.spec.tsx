import { CreateCorporateAsAdmin } from 'app/pages/admin/pages/CreateCorporateAsAdmin'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/admin/__tests__/AdminCorporateInvestorForm/AdminCorporateInvestorForm',
  () => ({
    AdminCorporateInvestorForm: jest.fn(() => null)
  })
)

describe('CreateCorporateAsAdmin', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreateCorporateAsAdmin />)
  })
})
