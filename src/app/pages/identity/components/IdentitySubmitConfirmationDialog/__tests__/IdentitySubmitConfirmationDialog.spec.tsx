import { fireEvent } from '@testing-library/react'
import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import React from 'react'
import { render } from 'test-utils'

describe('IdentitySubmitConfirmation', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes close func when close button is clicked', () => {
    const closeFunc = jest.fn()
    const { getByRole } = render(
      <IdentitySubmitConfirmationDialog open closeDialog={closeFunc} />
    )
    fireEvent.click(getByRole('button'))

    expect(closeFunc).toHaveBeenCalled()
  })
})
