import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import { history } from 'config/history'
import React from 'react'
import { render, cleanup } from 'test-utils'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateIdentityView', () => {
  beforeEach(() => {
    history.push('/', { identityId: '123' })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CorporateIdentityView />)
  })
})
