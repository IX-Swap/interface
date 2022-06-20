import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import React from 'react'
import { render } from 'test-utils'
import { TaxResidencyFieldArray } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray',
  () => ({
    TaxResidencyFieldArray: jest.fn(() => null)
  })
)

describe('TaxDeclarationForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders child components correctly', () => {
    render(<TaxDeclarationForm />)

    expect(TaxResidencyFieldArray).toHaveBeenCalled()
  })
})
