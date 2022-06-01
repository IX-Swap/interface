import { fireEvent } from '@testing-library/react'
import {
  TaxResidencyField,
  TaxResidencyFieldProps
} from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField/TaxResidencyField'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('TaxResidencyField', () => {
  const mockAppend = jest.fn()
  const mockRemove = jest.fn()

  const defaultValues = {
    taxResidencies: [
      {
        countryOfResidence: 'Singapore',
        taxIdentificationNumber: '1234567890'
      }
    ]
  }

  const props: TaxResidencyFieldProps = {
    field: {
      countryOfResidence: 'Singapore',
      taxIdentificationNumber: '1234567890',
      id: '123'
    },
    append: mockAppend,
    remove: mockRemove,
    isLast: true,
    index: 0,
    max: 5,
    total: 1,
    defaultValue: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders field default values correctly', () => {
    const { container } = render(
      <Form defaultValues={defaultValues}>
        <TaxResidencyField {...props} />
      </Form>
    )
    const countryInput = container.querySelector(
      'input[name="taxResidencies[0].countryOfResidence"]'
    ) as HTMLInputElement

    // const taxIdInput = container.querySelector(
    //   'input[name="taxResidencies[0].taxIdentificationNumber"]'
    // ) as HTMLInputElement

    expect(countryInput.value).toBe('Singapore')
    // expect(taxIdInput.value).toBe('1234567890')
  })

  it('handles remove and append buttons correctly', () => {
    const { getByText } = render(
      <Form defaultValues={defaultValues}>
        <TaxResidencyField {...props} />
      </Form>
    )

    const addMoreButton = getByText('Add Country')

    fireEvent.click(addMoreButton, { cancellable: true, bubbles: true })
    expect(mockAppend).toHaveBeenCalled()
  })
})
