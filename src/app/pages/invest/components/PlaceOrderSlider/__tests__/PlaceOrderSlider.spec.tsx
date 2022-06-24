import { Slider } from '@mui/material'
import { Form } from 'components/form/Form'
import React from 'react'
import * as useFormContext from 'react-hook-form'
import { render } from 'test-utils'
import { PlaceOrderSlider } from '../PlaceOrderSlider'

jest.mock('@mui/material/Slider', () =>
  jest.fn(props => <input {...props}></input>)
)

describe('PlaceOrderSlider', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders PlaceOrderSlider with correct props', () => {
    const objResponse = {
      watch: () => 1,
      setValue: (key: string, value: number) => null
    }

    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => objResponse as any)

    render(
      <Form>
        <PlaceOrderSlider balance={1000} activeTab={1} />
      </Form>
    )

    expect(Slider).toBeCalledWith(
      expect.objectContaining({
        step: 0.05,
        value: 0
      }),
      {}
    )
  })
})
