import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { TaxResidencyFieldArray } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { TaxDeclarationInfo } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfo'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray',
  () => ({
    TaxResidencyFieldArray: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfo',
  () => ({
    TaxDeclarationInfo: jest.fn(() => null)
  })
)

jest.mock('app/pages/identity/components/FormSectionHeader', () => ({
  FormSectionHeader: jest.fn(() => null)
}))

describe('TaxDeclarationForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders child components with correct props', () => {
    render(
      <Form>
        <TaxDeclarationForm />
      </Form>
    )

    expect(FormSectionHeader).toHaveBeenCalledWith(
      { title: 'Tax Declaration' },
      {}
    )
    expect(TaxDeclarationInfo).toHaveBeenCalled()
    expect(TaxResidencyFieldArray).toHaveBeenCalledWith(
      { identityType: 'individual' },
      {}
    )
  })
})
