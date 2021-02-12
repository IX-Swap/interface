import { TinUnavailableFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ReasonFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields'
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
        <TinUnavailableFields />
      </Form>
    )
  })

  it('renders component with default props', () => {
    render(
      <Form>
        <TinUnavailableFields />
      </Form>
    )

    expect(ReasonFields).toHaveBeenCalledWith(
      {
        disabled: true
      },
      {}
    )
  })
})
