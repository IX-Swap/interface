import { CorporateInformationForm } from 'app/pages/identity/components/CorporateInformationForm/CorporateInformationForm'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

window.URL.revokeObjectURL = jest.fn()

describe('Component', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <CorporateInformationForm />
      </Form>
    )
  })
})
