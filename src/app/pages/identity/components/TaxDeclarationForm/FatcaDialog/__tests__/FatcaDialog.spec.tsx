import { FatcaDialog } from 'app/pages/identity/components/TaxDeclarationForm/FatcaDialog/FatcaDialog'
import React from 'react'
import { render } from 'test-utils'

describe('FatcaDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<FatcaDialog />)
  })
})
