import { PersonnelInformation } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('PersonnelInformation', () => {
  const props = {
    fieldId: '123',
    rootName: 'representatives',
    index: 0,
    defaultValue: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <PersonnelInformation {...props} />
      </Form>
    )
  })

  it('renders input fields with default values correctly', () => {
    const { container } = render(
      <Form
        defaultValues={{
          representatives: [
            {
              fullName: 'John Doe',
              designation: 'CEO',
              email: 'john@company.com',
              contactNumber: '1234567890'
            }
          ]
        }}
      >
        <PersonnelInformation {...props} />
      </Form>
    )

    const fullNameInput = container.querySelector(
      'input[name="representatives[0].fullName"]'
    ) as HTMLInputElement

    const designationInput = container.querySelector(
      'input[name="representatives[0].designation"]'
    ) as HTMLInputElement

    const emailInput = container.querySelector(
      'input[name="representatives[0].email"]'
    ) as HTMLInputElement

    const contactNumberInput = container.querySelector(
      'input[name="representatives[0].contactNumber"]'
    ) as HTMLInputElement

    expect(fullNameInput).toBeInTheDocument()
    expect(fullNameInput.value).toEqual('John Doe')

    expect(designationInput).toBeInTheDocument()
    expect(designationInput.value).toEqual('CEO')

    expect(emailInput).toBeInTheDocument()
    expect(emailInput.value).toEqual('john@company.com')

    expect(contactNumberInput).toBeInTheDocument()
    expect(contactNumberInput.value).toEqual('+1 (234) 567-890')
  })
})
