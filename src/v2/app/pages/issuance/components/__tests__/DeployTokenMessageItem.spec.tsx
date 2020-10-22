/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DeployTokenMessageItem,
  DeployTokenMessageProps
} from 'v2/app/pages/issuance/components/DeployTokenMessageItem'

describe('DeployTokenMessageItem', () => {
  const props: DeployTokenMessageProps = {
    data: [{ at: '123', message: 'test message' }],
    index: 0,
    style: {}
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DeployTokenMessageItem {...props} />)
  })
})
