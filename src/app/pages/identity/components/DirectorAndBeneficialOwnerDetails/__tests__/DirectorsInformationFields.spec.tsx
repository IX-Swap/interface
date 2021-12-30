import { DirectorsInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('DirectorsInformationFields', () => {
  const props = {
    rootName: 'directors',
    index: 0,
    fieldId: '123',
    defaultValue: {} as any
  }
  const defaultValues = {
    directors: [
      {
        fullName: 'Oranges Lemons',
        contactNumber: '1234563',
        designation: 'Director of Finance',
        email: 'oranges@lemons.com'
      }
    ]
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form defaultValues={defaultValues}>
        <DirectorsInformationFields {...props} />
      </Form>
    )
  })

  it('renders labels and components correctly', () => {
    const { getByLabelText } = render(
      <Form defaultValues={defaultValues}>
        <DirectorsInformationFields {...props} />
      </Form>
    )

    const fullNameInput = getByLabelText('Full Name') as HTMLInputElement
    expect(fullNameInput.value).toEqual('Oranges Lemons')

    const contactNumberInput = getByLabelText(
      'Contact Number'
    ) as HTMLInputElement
    expect(contactNumberInput.value).toEqual('+1 (234) 563')

    const designationInput = getByLabelText('Designation') as HTMLInputElement
    expect(designationInput.value).toEqual('Director of Finance')

    const emailAddressInput = getByLabelText(
      'Email Address'
    ) as HTMLInputElement
    expect(emailAddressInput.value).toEqual('oranges@lemons.com')
  })
})
