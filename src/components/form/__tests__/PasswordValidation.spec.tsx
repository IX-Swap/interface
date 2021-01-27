import React from 'react'
import { render, cleanup } from 'test-utils'
import { PasswordValidation } from 'components/form/PasswordValidation'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { green } from '@material-ui/core/colors'

jest.mock('@material-ui/icons/Close', () => jest.fn(() => null))
jest.mock('@material-ui/icons/Check', () => jest.fn(() => null))

describe('PasswordValidation', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PasswordValidation inValid={true} label='Invalid' />)
  })

  it('renders components correctly', () => {
    const { getByText, rerender } = render(
      <PasswordValidation inValid={true} label='Invalid' />
    )
    expect(CloseIcon).toHaveBeenCalledWith(
      {
        fontSize: 'small',
        style: undefined,
        color: 'error'
      },
      {}
    )

    rerender(<PasswordValidation inValid={false} label='Invalid' />)
    expect(CheckIcon).toHaveBeenCalledWith(
      {
        fontSize: 'small',
        style: { color: green[500] },
        color: undefined
      },
      {}
    )

    expect(getByText('Invalid')).toBeTruthy()
  })
})
