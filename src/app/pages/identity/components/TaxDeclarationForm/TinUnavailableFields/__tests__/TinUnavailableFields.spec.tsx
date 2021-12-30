import { TinUnavailableFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'
import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields',
  () => ({
    ReasonFields: jest.fn(() => null)
  })
)

describe('TinUnavailableFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <TinUnavailableFields index={0} defaultValue={{} as any} />
      </Form>
    )
  })
})
