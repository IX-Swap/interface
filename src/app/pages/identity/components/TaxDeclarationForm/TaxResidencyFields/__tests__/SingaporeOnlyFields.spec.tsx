import React from 'react'
import { SingaporeOnlyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields'
import { Form } from 'components/form/Form'
import { render } from 'test-utils'

describe('SingaporeOnlyFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <SingaporeOnlyFields />
      </Form>
    )
  })
})
