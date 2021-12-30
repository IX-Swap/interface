import {
  FundSourceSlider,
  FundSourceSliderProps
} from 'app/pages/identity/components/FinancialInformationForm/FundSourceSlider'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import * as useFormContext from 'react-hook-form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('FundSourceSlider', () => {
  const props: FundSourceSliderProps = {
    field: {
      name: 'Salary',
      value: 10
    },
    index: 0
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders the slider disabled by default', () => {
    render(
      <Form>
        <FundSourceSlider {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true
      }),
      {}
    )
  })

  it('renders the slider not disabled when fundSource is checked ', () => {
    const objResponse = {
      watch: () => true
    }

    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => objResponse as any)

    render(
      <Form>
        <FundSourceSlider {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false
      }),
      {}
    )
  })
})
