import React from 'react'
import { cleanup, render } from 'test-utils'
import { ColumnsEditor, ColumnsEditorProps } from '../ColumnsEditor'
import { columns } from 'app/pages/invest/components/DSOTable/columns'
import { ColumnsEditorItem } from 'app/pages/invest/components/DSOTable/ColumnsEditorItem'

jest.mock('app/pages/invest/__tests__/DSOTable/ColumnsEditorItem', () => ({
  ColumnsEditorItem: jest.fn(() => null)
}))

describe('ColumnsEditor', () => {
  const props: ColumnsEditorProps = {
    onDeselect: jest.fn(),
    onSelect: jest.fn(),
    selected: columns
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<ColumnsEditor {...props} />)
  })

  it('renders correct title', () => {
    const { getByText } = render(<ColumnsEditor {...props} />)

    expect(getByText(/add more columns/gi)).toBeTruthy()
  })

  it('renders ColumnsEditorItem for every column', () => {
    render(<ColumnsEditor {...props} />)

    columns.forEach((column, index) => {
      expect(ColumnsEditorItem).toHaveBeenNthCalledWith(
        index + 1,
        {
          value: column.key,
          isSelected: true,
          onSelect: props.onSelect,
          onDeselect: props.onDeselect
        },
        {}
      )
    })
  })
})
