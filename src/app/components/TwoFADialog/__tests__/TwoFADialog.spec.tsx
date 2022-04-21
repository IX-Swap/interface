import React from 'react'
import { render } from 'test-utils'
import {
  TwoFADialog,
  TwoFADialogProps
} from 'app/components/TwoFADialog/TwoFADialog'

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
})
