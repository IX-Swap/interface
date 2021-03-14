import { AuthorizationDocuments } from 'app/pages/_identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizationDocuments'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AuthorizationDocuments', () => {
  const props = {
    fieldId: '123',
    rootName: 'representatives',
    index: 0,
    defaultValue: {} as any
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
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
        'Board Resolution, Power of Attorney, Partnership Deed, Trust Deed, and Others.'
      )
    ).toBeTruthy()
  })
})
