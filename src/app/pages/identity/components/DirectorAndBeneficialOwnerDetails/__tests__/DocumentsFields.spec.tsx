import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
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
        'passport, driving license, NRIC and government issued ID card.'
      )
    ).toBeTruthy()
    expect(getByText('Proof of Address')).toBeTruthy()
    expect(
      getByText(
        'Utility bills, bank statement/credit card statement, tenancy agreement, and telecom bill.'
      )
    ).toBeTruthy()
  })
})
