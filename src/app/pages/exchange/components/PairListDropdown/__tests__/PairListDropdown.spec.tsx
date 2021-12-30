import { PairListDropdown } from 'app/pages/exchange/components/PairListDropdown/PairListDropdown'
import React from 'react'
import { render } from 'test-utils'
import { ClickAwayListener } from '@material-ui/core'
import { fireEvent, waitFor } from '@testing-library/dom'

jest.mock('@material-ui/core/ClickAwayListener', () => jest.fn(() => null))

describe('PairListDropdown', () => {
  const setAnchorEl = jest.fn()
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
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

  it('invokes setAnchorEl function with click on pair name', async () => {
    const anchorEl = null
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [anchorEl, setAnchorEl])

    const { getByTestId } = render(<PairListDropdown pairName='IXPS/SGD' />)
    fireEvent.click(getByTestId('pairName'))

    await waitFor(() => {
      expect(setAnchorEl).toBeCalledWith(null)
    })
  })
})
