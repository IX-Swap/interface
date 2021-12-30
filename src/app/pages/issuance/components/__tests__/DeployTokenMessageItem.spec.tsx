import React from 'react'
import { render } from 'test-utils'
import {
  DeployTokenMessageItem,
  DeployTokenMessageProps
} from 'app/pages/issuance/components/DeployTokenMessageItem'

describe('DeployTokenMessageItem', () => {
  const props: DeployTokenMessageProps = {
    data: [{ at: '123', message: 'test message' }],
    index: 0,
    style: {}
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DeployTokenMessageItem {...props} />)
  })
})
