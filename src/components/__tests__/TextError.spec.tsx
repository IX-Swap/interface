import React from 'react'
import { render } from 'test-utils'
import { TextError, TextErrorProps } from 'components/TextError'

describe('TextError', () => {
  const error = {
    type: 'error type',
    message: 'error message'
  }
  const props: TextErrorProps = {
    error
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<TextError {...props} />)
  })

  it('renders nothing if error is undefined', () => {
    const { container } = render(<TextError error={undefined} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders error message correctly', () => {
    const { getByText } = render(<TextError {...props} />)

    expect(getByText(error.message)).toBeTruthy()
  })
})
