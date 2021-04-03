import { TaxDeclarationInfoDialog } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TaxDeclarationInfoDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TaxDeclarationInfoDialog />)
  })
})
