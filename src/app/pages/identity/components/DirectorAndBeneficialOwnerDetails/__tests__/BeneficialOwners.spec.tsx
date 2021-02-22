import { BeneficialOwners } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwners'
import { BeneficialOwnerFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwnerFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwnerFields',
  () => ({
    BeneficialOwnerFields: jest.fn(() => null)
  })
)

describe('BeneficialOwners', () => {
  const defaultValues = {
    beneficialOwners: [
      {
        fullName: 'Oranges Lemons'
      },
      {
        fullName: 'Apples Bananas'
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
        <BeneficialOwners />
      </Form>
    )
  })

  it('renders components correctly', () => {
    render(
      <Form defaultValues={defaultValues}>
        <BeneficialOwners />
      </Form>
    )

    expect(BeneficialOwnerFields).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        rootName: 'beneficialOwners',
        index: 0,
        isLast: false
      }),
      {}
    )
    expect(BeneficialOwnerFields).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        rootName: 'beneficialOwners',
        index: 1,
        isLast: true
      }),
      {}
    )
  })
})
