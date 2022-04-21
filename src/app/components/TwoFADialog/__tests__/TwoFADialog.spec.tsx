import React from 'react'
import { render } from 'test-utils'
import {
  TwoFADialog,
  TwoFADialogProps
} from 'app/components/TwoFADialog/TwoFADialog'
import { Actions } from 'app/components/TwoFADialog/Actions/Actions'

jest.mock('app/components/TwoFADialog/Actions/Actions', () => ({
  Actions: jest.fn(() => null)
}))

describe('TwoFADialog', () => {
  const props: TwoFADialogProps = {
    enable2Fa: false,
    isOpen: true,
    onClose: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<TwoFADialog {...props} />)
    expect(container).toMatchSnapshot()
  })

  it('renders actions component with correct props', () => {
    render(<TwoFADialog {...props} />)
    expect(Actions).toHaveBeenCalledWith(
      expect.objectContaining({
        enable2fa: props.enable2Fa
      }),
      {}
    )
  })
})
