import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdentityForm } from 'app/pages/identity/components/CorporateIdentityForm'
import { history } from 'config/history'

describe('CorporateIdentityForm', () => {
  beforeEach(() => {
    history.push('/', { identityId: '123' })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateIdentityForm />)
  })
})
