import { PairListDropdown } from 'app/pages/invest/components/PairListDropdown/PairListDropdown'
import React from 'react'
import { render } from 'test-utils'
import { ClickAwayListener } from '@mui/material'
import { fireEvent, waitFor } from '@testing-library/dom'

jest.mock('@mui/material/ClickAwayListener', () => jest.fn(() => null))

describe('PairListDropdown', () => {
  const setAnchorEl = jest.fn()
  const props = {
    path: 'https://test.com',
    params: {
      dsoId: '1234',
      issuerId: '123'
    }
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders ClickAwayListener when anchorEl is null', () => {
    const anchorEl = null
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [anchorEl, setAnchorEl])

    render(<PairListDropdown pairName='IXPS/SGD' {...props} />)

    expect(ClickAwayListener).toHaveBeenCalledTimes(0)
  })

  it('renders ClickAwayListener when anchorEl is not null', () => {
    const anchorEl = ''
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [anchorEl, setAnchorEl])

    render(<PairListDropdown pairName='IXPS/SGD' {...props} />)

    expect(ClickAwayListener).toHaveBeenCalledTimes(1)
  })

  it('invokes setAnchorEl function with click on pair name', async () => {
    const anchorEl = null
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [anchorEl, setAnchorEl])

    const { getByTestId } = render(
      <PairListDropdown pairName='IXPS/SGD' {...props} />
    )
    fireEvent.click(getByTestId('pairName'))

    await waitFor(() => {
      expect(setAnchorEl).toBeCalledWith(null)
    })
  })
})
