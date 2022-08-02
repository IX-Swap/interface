import { MainInfo } from 'app/components/DSO/MainInfo/MainInfo'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('MainInfo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    const { container } = render(<MainInfo dso={dso} />)
    expect(container).toMatchSnapshot()
  })
})
