import React from 'react'
import { render, fireEvent } from 'test-utils'
import { ColumnsEditorToggle } from 'app/pages/invest/components/DSOTable/ColumnsEditorToggle'

describe('ColumnsEditorToggle', () => {
  const mockClickHandler = jest.fn()
  it.skip('renders without any errors', () => {
    render(<ColumnsEditorToggle onClick={mockClickHandler} selected={false} />)
  })

  it('handles click correctly', () => {
    const { getByRole } = render(
      <ColumnsEditorToggle onClick={mockClickHandler} selected={false} />
    )
    fireEvent.click(getByRole('button'))
    expect(mockClickHandler).toBeCalledTimes(1)
  })
})
