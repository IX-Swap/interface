import { AuthorizedPersonnelFields } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnelFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { fireEvent } from '@testing-library/react'

describe('AuthorizedPersonnelFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders adds fields when Add more button is clicked correctly', () => {
    const { container, getByText } = render(
      <Form defaultValues={{ representatives: [{}] }}>
        <AuthorizedPersonnelFields />
      </Form>
    )

    expect(getByText('Company Authorized Personnel')).toBeTruthy()

    const representativeFullNameInput = container.querySelector(
      'input[name="representatives[0].fullName"]'
    ) as HTMLInputElement
    expect(representativeFullNameInput).toBeInTheDocument()

    const AddMoreButton = getByText('Add more')
    fireEvent.click(AddMoreButton, { cancellable: true, bubbles: true })

    const representativeFullNameInput2 = container.querySelector(
      'input[name="representatives[1].fullName"]'
    ) as HTMLInputElement
    expect(representativeFullNameInput2).toBeInTheDocument()
  })
})
