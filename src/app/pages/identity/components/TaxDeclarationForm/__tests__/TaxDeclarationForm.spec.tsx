import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import React from 'react'
import { render } from 'test-utils'
import { TaxResidencyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { Form } from 'components/form/Form'

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
    jest.clearAllMocks()
  })

  it('renders child components correctly', () => {
    render(
      <Form>
        <TaxDeclarationForm />
      </Form>
    )

    expect(TaxResidencyFields).toHaveBeenCalled()
    expect(UsCitizenshipConfirmation).toHaveBeenCalled()
  })
})
