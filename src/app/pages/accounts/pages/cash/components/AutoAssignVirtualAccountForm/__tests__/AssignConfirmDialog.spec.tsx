import { fireEvent } from '@testing-library/dom'
import { ConfirmationDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
import React from 'react'
import { render } from 'test-utils'
import { AssignConfirmDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/AssignConfirmDialog'

jest.mock(
  'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/ConfirmationDialog',
  () => ({
    ConfirmationDialog: jest.fn(() => null)
  })
)

describe('AssignConfirmDialog', () => {
  const onCloseMock = jest.fn()
  const submitMock = jest.fn()
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Calls confirmation dialog with the correct props', () => {
    render(
      <AssignConfirmDialog
        onClose={onCloseMock}
        handleSubmit={submitMock}
        open={true}
        assigning={false}
        currency={'SGD'}
      />
    )
    expect(ConfirmationDialog).toBeCalledWith(
      expect.objectContaining({
        onClose: onCloseMock,
        open: true,
        assigning: false,
        title: `Add SGD account`,
        bodyText: `Do you want to assign a SGD account?`
      }),
      {}
    )
  })
})
