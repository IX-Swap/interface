/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  RichTextEditor,
  RichTextEditorProps
} from 'v2/components/form/RichTextEditor'

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<RichTextEditor {...props} />)
  })
})
