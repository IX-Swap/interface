import { InternationalFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/InternationalFields'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'

jest.mock(
  'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField',
  () => ({
    TaxResidencyField: jest.fn(() => null)
  })
)

describe('InternationalFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <InternationalFields />
      </Form>
    )
  })
})
