import { TaxResidencyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { SingaporeOnlyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields'
import { InternationalFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/InternationalFields'
import { TinUnavailableFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'
import { Form } from 'components/form/Form'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields',
  () => ({
    SingaporeOnlyFields: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/InternationalFields',
  () => ({
    InternationalFields: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields',
  () => ({
    TinUnavailableFields: jest.fn(() => null)
  })
)

describe('TaxResidencyFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <TaxResidencyFields />
      </Form>
    )
  })

  it('renders components correctly', () => {
    render(
      <Form>
        <TaxResidencyFields />
      </Form>
    )

    expect(SingaporeOnlyFields).toHaveBeenCalled()
    expect(InternationalFields).toHaveBeenCalled()
    expect(TinUnavailableFields).toHaveBeenCalled()
  })
})
