import React from 'react'
import { render, cleanup } from 'test-utils'
import { Status } from 'app/pages/admin/components/Status'

describe('Status', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Status status='enabled' />)
  })

  it('renders props correctly', () => {
    const { getByText, container, rerender } = render(
      <Status status='enabled' />
    )

    expect(getByText(/enabled/i)).toBeInTheDocument()
    expect(container.querySelector('p')?.className).toContain('default')

    rerender(<Status status='enabled' variant='success' />)
    expect(container.querySelector('p')?.className).toContain('success')
  })
})
