import React from 'react'
import {
  BooleanColumn,
  BooleanColumnProps
} from 'app/pages/admin/components/BooleanColumn'
import { render } from 'test-utils'

describe('BooleanColumn', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<BooleanColumn value={true} />)
  })

  it('renders default labels and colors when none is provided', () => {
    const { getByText, container, rerender } = render(
      <BooleanColumn value={true} />
    )
    expect(getByText(/true/i)).toBeInTheDocument()
    expect(container?.firstChild).toHaveClass('MuiTypography-colorTextPrimary')

    rerender(<BooleanColumn value={false} />)
    expect(getByText(/false/i)).toBeInTheDocument()
    expect(container?.firstChild).toHaveClass('MuiTypography-colorError')
  })

  it('renders correct labels and colors provided', () => {
    const sampleProps: BooleanColumnProps = {
      value: true,
      labels: ['Enabled', 'Disabled'],
      colors: ['error', 'textPrimary']
    }

    const { getByText, container, rerender } = render(
      <BooleanColumn {...sampleProps} />
    )
    expect(getByText(/enabled/i)).toBeInTheDocument()
    expect(container?.firstChild).toHaveClass('MuiTypography-colorError')

    sampleProps.value = false
    rerender(<BooleanColumn {...sampleProps} />)
    expect(getByText(/disabled/i)).toBeInTheDocument()
    expect(container?.firstChild).toHaveClass('MuiTypography-colorTextPrimary')
  })
})
