import { TaxDeclarationForm } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationForm'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TaxDeclarationInfoDialog } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog'
import { TaxResidencyFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import { UsCitizenshipConfirmation } from 'app/pages/_identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog',
  () => ({
    TaxDeclarationInfoDialog: jest.fn(() => null)
  })
)

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

    expect(TaxDeclarationInfoDialog).toHaveBeenCalled()
    expect(TaxResidencyFields).toHaveBeenCalled()
    expect(UsCitizenshipConfirmation).toHaveBeenCalled()
  })
})
