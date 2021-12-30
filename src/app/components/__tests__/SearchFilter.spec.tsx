import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { SearchFilter } from 'app/components/SearchFilter'
import { history } from 'config/history'

describe('SearchFilter', () => {
  it.skip('renders without any error', () => {
    render(<SearchFilter />)
  })

  it('renders input element', () => {
    const { getByRole, getByPlaceholderText } = render(
      <SearchFilter placeholder='Search' />
    )
    expect(getByRole('textbox')).toBeInTheDocument()
    expect(getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('handles search change correctly', async () => {
    const { getByRole } = render(<SearchFilter />)
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'boop' } })
    await waitFor(() => {
      expect(history.location.search).toBe('?search=boop')
    })
  })
})
