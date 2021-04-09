import { TaxDeclarationInfoContent } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoContent'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TaxDeclarationInfoContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TaxDeclarationInfoContent />)
  })
})
