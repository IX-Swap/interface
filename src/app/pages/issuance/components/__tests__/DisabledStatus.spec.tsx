import React from 'react'
import { DisabledStatus } from 'app/pages/issuance/components/DisabledStatus'
import { render, cleanup } from 'test-utils'

describe('DisabledStatus', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DisabledStatus disabled={true} />)
  })

  it('renders disabled when disabled is true', () => {
    const { getByText } = render(<DisabledStatus disabled={true} />)
    expect(getByText(/disabled/i)).toBeTruthy()
  })

  it('renders null when disabled is false', () => {
    const { container } = render(<DisabledStatus disabled={false} />)
    expect(container).toBeEmptyDOMElement()
  })
})
