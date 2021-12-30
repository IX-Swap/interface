import React from 'react'
import { render } from 'test-utils'
import { PasswordValidationItem } from 'components/form/PasswordValidationItem'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { green, red } from '@material-ui/core/colors'

jest.mock('@material-ui/icons/Close', () => jest.fn(() => null))
jest.mock('@material-ui/icons/Check', () => jest.fn(() => null))

describe('PasswordValidationItem', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PasswordValidationItem invalid={true} label='Invalid' />)
  })

  it('renders components correctly', () => {
    const { getByText, rerender } = render(
      <PasswordValidationItem invalid={true} label='Invalid' />
    )
    expect(CloseIcon).toHaveBeenCalledWith(
      {
        fontSize: 'small',
        style: { color: red[500] }
      },
      {}
    )

    rerender(<PasswordValidationItem invalid={false} label='Invalid' />)
    expect(CheckIcon).toHaveBeenCalledWith(
      {
        fontSize: 'small',
        style: { color: green[500] }
      },
      {}
    )

    expect(getByText('Invalid')).toBeTruthy()
  })
})
