import { Aside } from 'app/pages/security/pages/setup2fa/components/Aside'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Aside', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Aside />)
  })

  it('renders without errors', () => {
    const { getByText } = render(<Aside />)

    expect(getByText('Learn more')).toBeTruthy()
  })
})
