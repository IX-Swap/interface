import { CreateIssuerAsAdmin } from 'app/pages/admin/pages/CreateIssuerAsAdmin'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/admin/components/AdminCorporateIssuerForm/AdminCorporateIssuerForm',
  () => ({
    AdminCorporateIssuerForm: jest.fn(() => null)
  })
)

describe('CreateIssuerAsAdmin', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CreateIssuerAsAdmin />)
  })
})
