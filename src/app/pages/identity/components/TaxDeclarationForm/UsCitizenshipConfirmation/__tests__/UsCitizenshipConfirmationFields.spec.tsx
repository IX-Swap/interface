import { UsCitizenshipConfirmationFields } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmationFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('UsCitizenshipConfirmationFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <UsCitizenshipConfirmationFields />
      </Form>
    )
  })
})
