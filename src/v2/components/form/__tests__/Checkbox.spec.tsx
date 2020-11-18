import React from 'react'
import { render, cleanup } from 'test-utils'
import { TypedFieldRenderComponentProps } from 'v2/components/form/types'
import { Checkbox, CheckboxProps } from 'v2/components/form/Checkbox'

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Checkbox {...props} />)
  })
})
