import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('DocumentsFields', () => {
  const props = {
    rootName: 'document',
    index: 0,
    fieldId: '123',
    defaultValue: {} as any
  }
  const defaultValues = {
    directors: [
      {
        documents: {
          proofOfIdentity: [],
          proofOfAddress: []
        }
      }
    ]
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders labels and components correctly', () => {
    const { getByText } = render(
      <Form defaultValues={defaultValues}>
        <DocumentFields {...props} />
      </Form>
    )

    expect(getByText('Upload Documents')).toBeTruthy()
    expect(getByText('Proof of Identity')).toBeTruthy()
    expect(
      getByText(
        'Passport, Driving License, NRIC, Government Issued ID Card And Others'
      )
    ).toBeTruthy()
    expect(getByText('Proof of Address')).toBeTruthy()
    expect(
      getByText(
        'Utility Bills, Bank Statement/Credit Card Statement, Tenancy Agreement, Telecom Bill'
      )
    ).toBeTruthy()
  })
})
