import { fireEvent } from '@testing-library/dom'
import { ConfirmationDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
import React from 'react'
import { render } from 'test-utils'

describe('ConfirmationDialog', () => {
  const onCloseMock = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls onClose function when close button is called', () => {
    const button = jest.fn(() => <></>)
    const bodyText = 'Test'
    const title = 'Test title'
    const { getByText } = render(
      <ConfirmationDialog
        onClose={onCloseMock}
        open
        assigning={false}
        title={title}
        bodyText={bodyText}
        confirmButton={new button()}
      />
    )
    const closeButton = getByText('Cancel')

    const titleElement = getByText(title)
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalled()
    expect(titleElement).toBeDefined()
  })
})
