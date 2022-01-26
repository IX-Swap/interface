import React from 'react'
import { render } from 'test-utils'

// import * as Button from '@material-ui/core'
import { Actions, ActionProps } from '../Actions'

jest.mock('@material-ui/core/Button', () => jest.fn(() => null))

describe('Actions', () => {
  const props: ActionProps = {
    action: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  // it('renders Button component with correct props', () => {
  //   render(<Actions {...props} />)
  //   expect(Button).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       color: 'primary',
  //       variant: 'contained',
  //       children: 'Get Address'
  //     }),
  //     {}
  //   )
  // })
})
