import React from 'react'
import { render, cleanup } from 'test-utils'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import {
  BigCheckboxWithLabel,
  BigCheckboxWithLabelProps
} from 'components/form/BigCheckboxWithLabel/BigCheckboxWithLabel'

describe('BigCheckboxWithLabel', () => {
  const props: BigCheckboxWithLabelProps &
    TypedFieldRenderComponentProps<boolean> = {
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BigCheckboxWithLabel {...props} />)
  })

  it('renders without error if error is undefined', () => {
    render(<BigCheckboxWithLabel {...props} error={undefined as any} />)
  })
})
