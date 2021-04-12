import { SafeguardInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoContent/SafeguardInfoContent'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SafeguardInfoContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SafeguardInfoContent />)
  })
})
