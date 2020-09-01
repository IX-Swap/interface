/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, fireEvent, waitFor, cleanup } from 'test-utils'
import { StatusFilterItem } from 'v2/app/authorizer/components/StatusFilterItem'

describe('StatusFilterItem', () => {
  const selectedClass = 'Mui-selected'
  const children = <span data-testid='child' />
  const props = {
    isSelected: false,
    title: 'Approve',
    onClick: jest.fn()
  }

  afterEach(cleanup)

  it('renders with props correctly', async () => {
    const { getByText, getByTestId } = render(
      <StatusFilterItem {...props}>{children}</StatusFilterItem>
    )
    const child = getByTestId('child')
    const title = getByText(props.title)

    expect(child).toBeTruthy
    expect(title).toBeTruthy
  })

  it('renders without selected class if item is not selected', async () => {
    const { getByRole } = render(
      <StatusFilterItem {...props}>{children}</StatusFilterItem>
    )
    const item = getByRole('button')

    expect(item).not.toHaveClass(selectedClass)
  })

  it('renders with selected class if item is selected', async () => {
    const { getByRole } = render(
      <StatusFilterItem {...props} isSelected={true}>
        {children}
      </StatusFilterItem>
    )
    const item = getByRole('button')

    expect(item).toHaveClass(selectedClass)
  })

  it('fires onClick callback when clicked', async () => {
    const { getByRole } = render(
      <StatusFilterItem {...props}>{children}</StatusFilterItem>
    )
    const item = getByRole('button')

    fireEvent.click(item)

    await waitFor(() => {
      expect(props.onClick).toBeCalledTimes(1)
    })
  })
})
