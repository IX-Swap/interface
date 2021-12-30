import React from 'react'
import { render } from 'test-utils'
import {
  RichTextEditor,
  RichTextEditorProps
} from 'components/form/RichTextEditor'

describe('RichTextEditor', () => {
  const props: RichTextEditorProps = {
    onChange: jest.fn(),
    value: '',
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    error: false,
    label: 'test label',
    name: 'test-name',
    control: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<RichTextEditor {...props} />)
  })
})
