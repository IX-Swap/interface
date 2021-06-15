import React from 'react'
import { render, cleanup } from 'test-utils'

import * as Button from '@material-ui/core'
import { Actions, ActionProps } from '../Actions'

jest.mock('@material-ui/core/Button', () => jest.fn(() => null))

describe('Actions', () => {
  const props: ActionProps = {
    action: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Actions {...props} />)
  })

  it('renders Button component with correct props', () => {
    render(<Actions {...props} />)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'primary',
        variant: 'contained',
        children: 'Get Address'
      }),
      {}
    )
  })
})
