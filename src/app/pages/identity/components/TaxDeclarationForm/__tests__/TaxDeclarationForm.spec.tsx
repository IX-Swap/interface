import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TaxResidencyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields',
  () => ({
    TaxResidencyFields: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation',
  () => ({
    UsCitizenshipConfirmation: jest.fn(() => null)
  })
)

describe('TaxDeclarationForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TaxDeclarationForm />)
  })

  it('renders child components correctly', () => {
    render(<TaxDeclarationForm />)

    expect(TaxResidencyFields).toHaveBeenCalled()
    expect(UsCitizenshipConfirmation).toHaveBeenCalled()
  })
})
