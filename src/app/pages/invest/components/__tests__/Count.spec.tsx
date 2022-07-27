import React from 'react'
import { render } from 'test-utils'
import { Count } from 'app/pages/invest/components/Count'

describe('Count', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct value if value is undefined', () => {
    const { container } = render(<Count value={undefined as any} />)
    expect(container).toHaveTextContent('0')
  })

  it('renders correct number value', () => {
    const value = 32
    const { container } = render(<Count value={value} />)

    expect(container).toHaveTextContent(value.toString())
  })

  it('renders correct string value, should match snapshot', () => {
    const value = '32'
    const { container } = render(<Count value={value} />)

    expect(container).toHaveTextContent(value)
    expect(container).toMatchSnapshot()
  })
})
