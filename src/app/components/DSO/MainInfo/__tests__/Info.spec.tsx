import { Info } from 'app/components/DSO/MainInfo/Info'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Info', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    const { container } = render(<Info label='My Info' value={123456} />)
    expect(container).toMatchSnapshot()
  })
})
