import { CreateIssuerAsAdmin } from 'app/pages/admin/pages/CreateIssuerAsAdmin'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/admin/components/AdminCorporateIssuerForm/AdminCorporateIssuerForm',
  () => ({
    AdminCorporateIssuerForm: jest.fn(() => null)
  })
)

describe('CreateIssuerAsAdmin', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreateIssuerAsAdmin />)
  })
})
