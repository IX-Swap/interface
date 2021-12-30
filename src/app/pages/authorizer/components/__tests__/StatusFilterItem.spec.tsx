import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { StatusFilterItem } from 'app/pages/authorizer/components/StatusFilterItem'

describe('StatusFilterItem', () => {
  const selectedClass = 'Mui-selected'
  const props = {
    isSelected: false,
    title: 'Approve',
    icon: () => <div />,
    onClick: jest.fn()
  }

  afterEach(cleanup)

  it.skip('renders with correct props', async () => {
    const { getByText } = render(<StatusFilterItem {...props} />)
    const title = getByText(props.title)

    expect(title).toBeTruthy()
  })

  it.skip('renders without selected class if item is not selected', async () => {
    const { getByRole } = render(<StatusFilterItem {...props} />)
    const item = getByRole('button')

    expect(item).not.toHaveClass(selectedClass)
  })

  it.skip('renders with selected class if item is selected', async () => {
    const { getByRole } = render(<StatusFilterItem {...props} isSelected />)
    const item = getByRole('button')

    expect(item).toHaveClass(selectedClass)
  })

  it('fires onClick callback when clicked', async () => {
    const { getByRole } = render(<StatusFilterItem {...props} />)
    const item = getByRole('button')

    fireEvent.click(item)

    await waitFor(() => {
      expect(props.onClick).toBeCalledTimes(1)
    })
  })
})
