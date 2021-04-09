import { SafeguardInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoDialog'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SafeguardInfoDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SafeguardInfoDialog />)
  })
})
