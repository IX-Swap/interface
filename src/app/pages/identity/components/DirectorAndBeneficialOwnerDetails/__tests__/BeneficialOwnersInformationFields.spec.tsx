import { BeneficialOwnersInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwnersInformationFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('BeneficialOwnersFields', () => {
  const defaultValues = {
    beneficialOwners: [
      {
        fullName: 'Ely Buendia',
        percentageShareholding: 10
      }
    ]
  }
  const props = {
    rootName: 'beneficialOwners',
    index: 0,
    fieldId: '123',
    defaultValue: {} as any
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <BeneficialOwnersInformationFields {...props} />
      </Form>
    )
  })

  it('renders labels and components correctly', () => {
    const { getByLabelText } = render(
      <Form defaultValues={defaultValues}>
        <BeneficialOwnersInformationFields {...props} />
      </Form>
    )

    const fullNameInput = getByLabelText('Full Name') as HTMLInputElement
    expect(fullNameInput).toBeInTheDocument()
    expect(fullNameInput.value).toBe('Ely Buendia')

    const percentageShareholdingInput = getByLabelText(
      'Percentage Shareholding'
    ) as HTMLInputElement
    expect(percentageShareholdingInput).toBeInTheDocument()
  })
})
