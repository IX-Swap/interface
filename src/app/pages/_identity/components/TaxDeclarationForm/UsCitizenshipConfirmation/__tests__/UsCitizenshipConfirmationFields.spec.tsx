import { UsCitizenshipConfirmationFields } from 'app/pages/_identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmationFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('UsCitizenshipConfirmationFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <UsCitizenshipConfirmationFields />
      </Form>
    )
  })
})
