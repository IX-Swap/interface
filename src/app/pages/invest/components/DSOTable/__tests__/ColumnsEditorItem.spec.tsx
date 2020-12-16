import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  ColumnsEditorItem,
  ColumnsEditorItemProps
} from 'app/pages/invest/components/DSOTable/ColumnsEditorItem'

describe('ColumnsEditorItem', () => {
  const props: ColumnsEditorItemProps = {
    value: 'corporate',
    isSelected: false,
    onDeselect: jest.fn(),
    onSelect: jest.fn()
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<ColumnsEditorItem {...props} />)
  })

  it('renders without error if selected', () => {
    render(<ColumnsEditorItem {...props} isSelected />)
  })
})
