import { history } from 'config/history'
import React from 'react'
import { fireEvent, render, waitFor } from 'test-utils'
import { TextInputSearchFilter } from '../TextInputSearchFilter'

describe('TextInputSearchFilter', () => {
  it('renders input element', () => {
    const { getByRole, getByPlaceholderText } = render(
      <TextInputSearchFilter placeholder='Search' />
    )
    expect(getByRole('textbox')).toBeInTheDocument()
    expect(getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('handles search change correctly', async () => {
    const { getByRole } = render(<TextInputSearchFilter />)
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'boop' } })
    await waitFor(() => {
      expect(history.location.search).toBe('?search=boop')
    })
  })
})
