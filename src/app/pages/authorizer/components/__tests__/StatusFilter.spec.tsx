import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import {
  StatusFilter,
  statusFilters
} from 'app/pages/authorizer/components/StatusFilter'

describe('StatusFilter', () => {
  const props = {
    onChange: jest.fn()
  }

  it('renders items from list', async () => {
    const { getAllByRole } = render(<StatusFilter {...props} />)
    const items = getAllByRole('button')

    expect(items.length).toBe(statusFilters.length)
  })

  it('calls props.onChange when click on every item exactly once', async () => {
    const { getAllByRole } = render(<StatusFilter {...props} />)
    const items = getAllByRole('button')

    for (let i = 0; i < items.length; i++) {
      fireEvent.click(items[i])
      await waitFor(() => {
        expect(props.onChange).toHaveBeenCalledTimes(i + 1)
      })
    }
  })
})
