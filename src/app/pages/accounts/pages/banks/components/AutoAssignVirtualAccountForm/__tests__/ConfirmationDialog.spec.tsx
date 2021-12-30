import { fireEvent } from '@testing-library/dom'
import { ConfirmationDialog } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('ConfirmationDialog', () => {
  const onCloseMock = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
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
