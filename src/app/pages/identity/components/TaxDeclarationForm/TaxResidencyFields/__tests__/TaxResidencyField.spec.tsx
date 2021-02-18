import { fireEvent } from '@testing-library/react'
import {
  TaxResidencyField,
  TaxResidencyFieldProps
} from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TaxResidencyField', () => {
  const mockAppend = jest.fn()
  const mockRemove = jest.fn()

  const props: TaxResidencyFieldProps = {
    field: {
      countryOfResidence: 'Singapore',
      taxIdentificationNumber: '123789456',
      id: '123'
    },
    append: mockAppend,
    remove: mockRemove,
    isLast: true,
    index: 1,
    disabled: false,
    max: 5,
    total: 2
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <TaxResidencyField {...props} />
      </Form>
    )
  })

  it('renders field default values correctly', () => {
    const { container } = render(
      <Form>
        <TaxResidencyField {...props} />
      </Form>
    )
    const countryInput = container.querySelector(
      'input[name="taxResidencies[1].countryOfResidence"]'
    ) as HTMLInputElement

    const taxIdInput = container.querySelector(
      'input[name="taxResidencies[1].taxIdentificationNumber"]'
    ) as HTMLInputElement

    expect(countryInput.value).toBe('Singapore')
    expect(taxIdInput.value).toBe('123789456')
  })

  it('handles remove and append buttons correctly', () => {
    const { getByText, getByTestId } = render(
      <Form>
        <TaxResidencyField {...props} />
      </Form>
    )

    const addMoreButton = getByText('Add more')
    const removeButton = getByTestId('remove-button')

    fireEvent.click(addMoreButton, { cancellable: true, bubbles: true })
    expect(mockAppend).toHaveBeenCalled()

    fireEvent.click(removeButton, { cancellable: true, bubbles: true })
    expect(mockRemove).toHaveBeenCalled()
  })
})
