import { DirectorsAndBeneficialOwnerFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerFields'
import { Fields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields',
  () => ({
    Fields: jest.fn(() => null)
  })
)

describe('DirectorsAndBeneficialOwnerFields', () => {
  const defaultValues = {
    directors: [
      {
        fullName: 'Oranges Lemons'
      },
      {
        fullName: 'Apples Bananas'
      }
    ]
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components correctly', () => {
    render(
      <Form defaultValues={defaultValues}>
        <DirectorsAndBeneficialOwnerFields name='directors' />
      </Form>
    )

    expect(Fields).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        rootName: 'directors',
        index: 0,
        isLast: false
      }),
      {}
    )
    expect(Fields).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        rootName: 'directors',
        index: 1,
        isLast: true
      }),
      {}
    )
  })
})
