import { TinUnavailableFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields',
  () => ({
    ReasonFields: jest.fn(() => null)
  })
)

describe('TinUnavailableFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <TinUnavailableFields index={0} />
      </Form>
    )
  })
})
