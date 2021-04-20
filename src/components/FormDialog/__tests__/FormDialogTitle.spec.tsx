import React from 'react'
import { render, cleanup } from 'test-utils'
import { FormDialogTitle } from 'components/FormDialog/FormDialogTitle'

describe('WADialogTitle', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<FormDialogTitle label='Test label' onClose={() => {}} />)
  })

  it('renders label correctly', () => {
    const { container } = render(
      <FormDialogTitle label='Test label' onClose={() => {}} />
    )

    expect(container).toHaveTextContent('Test label')
  })
})
