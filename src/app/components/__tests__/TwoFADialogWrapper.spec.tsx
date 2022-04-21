import React from 'react'
import { render } from 'test-utils'
import {
  TwoFADialogWrapper,
  TwoFADialogWrapperProps
} from 'app/components/TwoFADialogWrapper'
import * as useAuth from 'hooks/auth/useAuth'
import { TwoFADialog } from 'app/components/TwoFADialog/TwoFADialog'

jest.mock('app/components/TwoFADialog/TwoFADialog', () => ({
  TwoFADialog: jest.fn(() => null)
}))

describe('TwoFADialogWrapper', () => {
  const objResponse = {
    user: {
      enable2Fa: true
    }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders children and dialog with correct props', () => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const props: TwoFADialogWrapperProps = {
      children: <div data-testid={'test'}>test content</div>
    }

    const { container, getByTestId } = render(<TwoFADialogWrapper {...props} />)
    expect(container).toHaveTextContent('test content')
    expect(getByTestId('test')).toBeInTheDocument()
    expect(TwoFADialog).toHaveBeenCalledWith(
      expect.objectContaining({
        enable2Fa: objResponse.user.enable2Fa
      }),
      {}
    )
  })
})
