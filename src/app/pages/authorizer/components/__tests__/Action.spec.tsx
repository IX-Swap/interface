import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { Action } from 'app/pages/authorizer/components/Action'

describe('Action', () => {
  it('renders and invokes onClick function properly', async () => {
    const props = {
      label: 'Action',
      icon: () => <div data-testid='icon' />,
      onClick: jest.fn()
    }

    // @ts-expect-error
    const { getByText, getByTestId, getByRole } = render(<Action {...props} />)
    const label = getByText(props.label)
    const icon = getByTestId('icon')
    const container = getByRole('button')

    expect(label).toBeTruthy()
    expect(icon).toBeTruthy()

    fireEvent.click(container)

    await waitFor(() => {
      expect(props.onClick).toBeCalledTimes(1)
    })
  })
})
