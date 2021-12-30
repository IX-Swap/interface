import { Info } from 'auth/components/Info'
import React from 'react'
import { render } from 'test-utils'

describe('Info', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', () => {
    const { getByText } = render(<Info title='Info' info={['one', 'two']} />)

    expect(getByText('Info')).toBeTruthy()
    expect(getByText('one')).toBeTruthy()
    expect(getByText('two')).toBeTruthy()
  })
})
