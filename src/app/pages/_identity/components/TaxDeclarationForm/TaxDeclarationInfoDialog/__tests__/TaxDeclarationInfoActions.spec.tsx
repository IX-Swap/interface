import { TaxDeclarationInfoAction } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoActions'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TaxDeclarationInfoAction', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TaxDeclarationInfoAction />)
  })
})
