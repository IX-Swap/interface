import { fireEvent } from '@testing-library/dom'
import { ConfirmationDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
import React from 'react'
import { render } from 'test-utils'

describe('ConfirmationDialog', () => {
  const onCloseMock = jest.fn()
  const handleSubmit = jest.fn()
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls onClose function when close button is called', () => {
    const { getByText } = render(
      <ConfirmationDialog
        onClose={onCloseMock}
        open
        currency='SGD'
        assigning={false}
        handleSubmit={handleSubmit}
      />
    )
    const closeButton = getByText('Cancel')
    const assignButton = getByText('Assign')
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalled()
    fireEvent.click(assignButton)
    expect(handleSubmit).toHaveBeenCalled()
  })
})
