import React from 'react'
import { render } from 'test-utils'
import { Status } from 'app/pages/admin/components/Status'

describe('Status', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
