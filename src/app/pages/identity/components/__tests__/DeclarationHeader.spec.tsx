import React from 'react'
import { render, cleanup } from 'test-utils'
import { DeclarationHeader } from 'app/pages/identity/components/DeclarationHeader'

describe('DeclarationHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DeclarationHeader header='test header' />)
  })

  it('renders header text correctly', () => {
    const { container } = render(<DeclarationHeader header='test header' />)

    expect(container).toHaveTextContent('test header')
  })
})
