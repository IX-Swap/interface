import { fireEvent } from '@testing-library/dom'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { MasDisclosureConfirmDialog } from 'app/pages/admin/components/MasDisclosureConfirmDialog'

describe('MasDisclosureConfirmDialog', () => {
  const onCloseMock = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <MasDisclosureConfirmDialog onClose={onCloseMock} open />
      </Form>
    )
  })

  it('calls onClose function when close button is called', () => {
    const { getByText } = render(
      <Form>
        <MasDisclosureConfirmDialog onClose={onCloseMock} open />
      </Form>
    )
    const closeButton = getByText('Cancel')
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalled()
  })
})
