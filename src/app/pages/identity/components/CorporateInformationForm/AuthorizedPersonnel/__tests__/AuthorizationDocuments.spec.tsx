import { AuthorizationDocuments } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizationDocuments'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('AuthorizationDocuments', () => {
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
        <AuthorizationDocuments {...props} />
      </Form>
    )
  })

  it('renders components and input fields correctly', () => {
    const { container, getByText } = render(
      <Form
        defaultValues={{
          representatives: [
            {
              documents: [{}]
            }
          ]
        }}
      >
        <AuthorizationDocuments {...props} />
      </Form>
    )

    const input = container.querySelector(
      'input[name="representatives[0].documents"]'
    ) as HTMLInputElement

    expect(input).toBeInTheDocument()
    expect(
      getByText(
        'Board resolution, power of attorney, partnership deed, trust deed, and others.'
      )
    ).toBeTruthy()
  })
})
