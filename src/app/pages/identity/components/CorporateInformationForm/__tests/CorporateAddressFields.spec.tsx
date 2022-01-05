import { CorporateAddressFields } from 'app/pages/identity/components/CorporateInformationForm/CorporateAddressFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('CorporateAddressFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Mailing Address fields when isMailingAddressSame is false', () => {
    const { container } = render(
      <Form defaultValues={{ isMailingAddressSame: false }}>
        <CorporateAddressFields />
      </Form>
    )
    const mailingAddressLine1Input = container.querySelector(
      'input[name="mailingAddress.line1"]'
    )
    expect(mailingAddressLine1Input).toBeInTheDocument()
  })
})
