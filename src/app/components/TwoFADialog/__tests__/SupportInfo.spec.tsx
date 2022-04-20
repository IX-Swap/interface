import React from 'react'
import { render } from 'test-utils'
import { SupportInfo } from 'app/components/TwoFADialog/SupportInfo/SupportInfo'

describe('SupportInfo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<SupportInfo />)
    expect(container).toMatchSnapshot()
  })
})
