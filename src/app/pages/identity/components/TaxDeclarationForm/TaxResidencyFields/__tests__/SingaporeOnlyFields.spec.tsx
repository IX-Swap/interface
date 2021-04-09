import React from 'react'
import { SingaporeOnlyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields'
import { Form } from 'components/form/Form'
import { render, cleanup } from 'test-utils'

describe('SingaporeOnlyFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <SingaporeOnlyFields />
      </Form>
    )
  })
})
