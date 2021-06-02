import { fireEvent } from '@testing-library/dom'
import { ConfirmationDialog } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ConfirmationDialog', () => {
  const onCloseMock = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form defaultValues={{ currency: 'SGD' }}>
        <ConfirmationDialog onClose={onCloseMock} open />
      </Form>
    )
  })

  it('calls onClose function when close button is called', () => {
    const { getByText } = render(
      <Form defaultValues={{ currency: 'SGD' }}>
        <ConfirmationDialog onClose={onCloseMock} open />
      </Form>
    )
    const closeButton = getByText('Cancel')
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalled()
  })
})
