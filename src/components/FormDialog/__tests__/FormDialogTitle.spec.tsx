import React from 'react'
import { render } from 'test-utils'
import { FormDialogTitle } from 'components/FormDialog/FormDialogTitle'

describe('WADialogTitle', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders label correctly', () => {
    const { container } = render(
      <FormDialogTitle label='Test label' onClose={() => {}} />
    )

    expect(container).toHaveTextContent('Test label')
  })
})
