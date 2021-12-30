import React from 'react'
import { render } from 'test-utils'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { Checkbox, CheckboxProps } from 'components/form/Checkbox'

describe('Checkbox', () => {
  const props: CheckboxProps & TypedFieldRenderComponentProps<boolean> = {
    label: 'test label',
    onChange: jest.fn(),
    value: false,
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    error: false,
    name: 'test-name',
    control: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Checkbox {...props} />)
  })
})
