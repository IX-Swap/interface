import { PairListDropdown } from 'app/pages/exchange/components/PairListDropdown/PairListDropdown'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ClickAwayListener } from '@material-ui/core'

jest.mock('@material-ui/core/ClickAwayListener', () => jest.fn(() => null))

describe('PairListDropdown', () => {
  const setAnchorEl = jest.fn()
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairListDropdown pairName='IXPS/SGD' />)
  })

  it('renders ClickAwayListener when anchorEl is null', () => {
    const anchorEl = null
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [anchorEl, setAnchorEl])

    render(<PairListDropdown pairName='IXPS/SGD' />)

    expect(ClickAwayListener).toHaveBeenCalledTimes(0)
  })

  it('renders ClickAwayListener when anchorEl is not null', () => {
    const anchorEl = ''
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [anchorEl, setAnchorEl])

    render(<PairListDropdown pairName='IXPS/SGD' />)

    expect(ClickAwayListener).toHaveBeenCalledTimes(1)
  })
})
