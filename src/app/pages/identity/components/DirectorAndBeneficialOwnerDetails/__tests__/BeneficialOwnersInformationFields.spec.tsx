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
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <BeneficialOwnersInformationFields
          rootName='beneficialOwners'
          index={0}
          fieldId='123'
        />
      </Form>
    )
  })

  it('renders labels and components correctly', () => {
    const { getByLabelText } = render(
      <Form defaultValues={defaultValues}>
        <BeneficialOwnersInformationFields
          rootName='beneficialOwners'
          index={0}
          fieldId='123'
        />
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
