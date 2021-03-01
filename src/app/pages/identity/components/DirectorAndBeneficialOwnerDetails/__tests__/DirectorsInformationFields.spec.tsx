import { DirectorsInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DirectorsInformationFields', () => {
  const defaultValues = {
    directors: [
      {
        fullName: 'Oranges Lemons',
        contactNumber: '1234563',
        residentialAddress: 'Singapore, Singapore',
        designation: 'Director of Finance',
        emailAddress: 'oranges@lemons.com'
      }
    ]
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form defaultValues={defaultValues}>
        <DirectorsInformationFields
          rootName='directors'
          index={0}
          fieldId='123'
        />
      </Form>
    )
  })

  it('renders labels and components correctly', () => {
    const { getByLabelText } = render(
      <Form defaultValues={defaultValues}>
        <DirectorsInformationFields
          rootName='directors'
          index={0}
          fieldId='123'
        />
      </Form>
    )

    const fullNameInput = getByLabelText('Full Name') as HTMLInputElement
    expect(fullNameInput.value).toEqual('Oranges Lemons')

    const contactNumberInput = getByLabelText(
      'Contact Number'
    ) as HTMLInputElement
    expect(contactNumberInput.value).toEqual('+1 (234) 563')

    const residentialAddressInput = getByLabelText(
      'Residential Address'
    ) as HTMLInputElement
    expect(residentialAddressInput.value).toEqual('Singapore, Singapore')

    const designationInput = getByLabelText('Designation') as HTMLInputElement
    expect(designationInput.value).toEqual('Director of Finance')

    const emailAddressInput = getByLabelText(
      'Email Address'
    ) as HTMLInputElement
    expect(emailAddressInput.value).toEqual('oranges@lemons.com')
  })
})
