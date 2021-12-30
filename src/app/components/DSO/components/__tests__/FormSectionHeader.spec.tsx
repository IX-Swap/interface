import React from 'react'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { render } from 'test-utils'

describe('DSOFormSectionHeader', () => {
  it.skip('renders without errors', () => {
    render(<FormSectionHeader title='Section Title' />)
  })

  it.skip('renders with correct props', () => {
    const { getByText } = render(<FormSectionHeader title='Section Title' />)

    expect(getByText('Section Title')).toBeInTheDocument()
  })
})
