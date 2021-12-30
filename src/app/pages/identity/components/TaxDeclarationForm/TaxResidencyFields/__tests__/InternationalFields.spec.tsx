import { InternationalFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/InternationalFields'
import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField',
  () => ({
    TaxResidencyField: jest.fn(() => null)
  })
)

describe('InternationalFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <InternationalFields />
      </Form>
    )
  })
})
