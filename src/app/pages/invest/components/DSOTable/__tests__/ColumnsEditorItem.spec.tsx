import React from 'react'
import { render, fireEvent } from 'test-utils'
import {
  ColumnsEditorItem,
  ColumnsEditorItemProps
} from 'app/pages/invest/components/DSOTable/ColumnsEditorItem'

describe('ColumnsEditorItem', () => {
  const mockSelect = jest.fn()
  const props: ColumnsEditorItemProps = {
    value: 'favorite',
    isSelected: false,
    onDeselect: jest.fn(),
    onSelect: mockSelect
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without any errors', () => {
    render(<ColumnsEditorItem {...props} />)
  })

  it.skip('renders without error if selected', () => {
    render(<ColumnsEditorItem {...props} isSelected />)
  })

  it('renders button and label correctly', () => {
    const { getByText, getByRole } = render(<ColumnsEditorItem {...props} />)
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByText('Favorite')).toBeInTheDocument()
  })

  it('handles select method when isSelected = false correctly', () => {
    const { getByRole } = render(<ColumnsEditorItem {...props} />)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(mockSelect).toHaveBeenCalledTimes(1)
  })

  it('handles select method when isSelected = true correctly', () => {
    props.isSelected = true
    const { getByRole } = render(<ColumnsEditorItem {...props} />)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(mockSelect).not.toHaveBeenCalled()
  })
})
