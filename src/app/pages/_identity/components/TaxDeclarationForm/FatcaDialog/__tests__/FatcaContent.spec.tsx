import { FatcaContent } from 'app/pages/_identity/components/TaxDeclarationForm/FatcaDialog/FatcaContent'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FatcaContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FatcaContent />)
  })
})
