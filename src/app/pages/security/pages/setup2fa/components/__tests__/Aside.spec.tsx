import { Aside } from 'app/pages/security/pages/setup2fa/components/Aside'
import React from 'react'
import { render } from 'test-utils'

describe('Aside', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Aside />)
  })

  it.skip('renders without errors', () => {
    const { getByText } = render(<Aside />)

    expect(getByText('Learn more')).toBeTruthy()
  })
})
