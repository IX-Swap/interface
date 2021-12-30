import React from 'react'
import { render } from 'test-utils'

import { LoadingMessage } from '../LoadingMessage'
import * as Typography from '@material-ui/core'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))
describe('LoadingMessage', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<LoadingMessage />)
  })
  it('calls Typography with correct props', () => {
    render(<LoadingMessage />)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Assigning please wait'
      }),
      {}
    )
  })
})
