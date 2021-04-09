import { FatcaDialog } from 'app/pages/identity/components/TaxDeclarationForm/FatcaDialog/FatcaDialog'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FatcaDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FatcaDialog />)
  })
})
