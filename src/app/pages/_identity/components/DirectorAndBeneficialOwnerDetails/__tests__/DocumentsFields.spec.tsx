import { DocumentFields } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form defaultValues={defaultValues}>
        <DocumentFields {...props} />
      </Form>
    )
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
        'Passport, Driving License, NRIC and Government Issued ID card.'
      )
    ).toBeTruthy()
    expect(getByText('Proof of Address')).toBeTruthy()
    expect(
      getByText(
        'Utility bills, Bank statement/Credit card statement, Tenancy agreement, and Telecom bill.'
      )
    ).toBeTruthy()
  })
})
