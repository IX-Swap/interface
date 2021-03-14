import { ReasonFields } from 'app/pages/_identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ReasonFields', () => {
  const props = {
    disabled: false,
    index: 0,
    defaultValue: {} as any
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <ReasonFields {...props} />
      </Form>
    )
  })
})
