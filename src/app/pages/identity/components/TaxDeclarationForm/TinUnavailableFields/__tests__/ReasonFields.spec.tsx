import { ReasonFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('ReasonFields', () => {
  const props = {
    disabled: false,
    index: 0,
    defaultValue: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <ReasonFields {...props} />
      </Form>
    )
  })
})
