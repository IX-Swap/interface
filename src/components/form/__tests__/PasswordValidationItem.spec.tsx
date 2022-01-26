import React from 'react'
import { render } from 'test-utils'
import { PasswordValidationItem } from 'components/form/PasswordValidationItem/PasswordValidationItem'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

jest.mock('@mui/icons-material/Close', () => jest.fn(() => null))
jest.mock('@mui/icons-material/Check', () => jest.fn(() => null))

describe('PasswordValidationItem', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components correctly', () => {
    const { getByText, rerender } = render(
      <PasswordValidationItem invalid={true} label='Invalid' />
    )
    expect(CloseIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        fontSize: 'small'
      }),
      {}
    )

    rerender(<PasswordValidationItem invalid={false} label='Invalid' />)
    expect(CheckIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        fontSize: 'small'
      }),
      {}
    )

    expect(getByText('Invalid')).toBeTruthy()
  })
})
