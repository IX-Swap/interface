import { ReasonFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ReasonFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <ReasonFields disabled={false} />
      </Form>
    )
  })

  it('renders with correct props', () => {
    const { getByLabelText } = render(
      <Form>
        <ReasonFields disabled={true} />
      </Form>
    )

    expect(
      getByLabelText(
        'Reason A - The country/jurisdiction where the Account Holder is resident does not issue TINs to its residents'
      )
    ).toBeDisabled()

    expect(
      getByLabelText(
        'Reason B - The Account Holder is otherwise unable to obtain a TIN or equivalent number (Please explain why your are unable to obtain a TIN in the below table if you have selected this reason)'
      )
    ).toBeDisabled()

    expect(
      getByLabelText(
        'Reason C - No TIN is required. (Note. Only select this reason if the domestic law of the relevant jurisdication does not require the collection of the TIN issued by such jurisdication)'
      )
    ).toBeDisabled()
  })
})
