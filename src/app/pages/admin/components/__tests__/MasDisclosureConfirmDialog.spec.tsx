import { fireEvent, waitFor } from '@testing-library/dom'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { MasDisclosureConfirmDialog } from 'app/pages/admin/components/MasDisclosureConfirmDialog'
import * as useCreateOrUpdateMASDisclosure from 'app/pages/exchange/hooks/useCreateOrUpdateMASDisclosure'

describe('MasDisclosureConfirmDialog', () => {
  const onCloseMock = jest.fn()
  const mutate = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls onClose function on cancel button click', () => {
    const { getByText } = render(
      <Form>
        <MasDisclosureConfirmDialog onClose={onCloseMock} open />
      </Form>
    )
    const closeButton = getByText('Cancel')
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('calls onClose and mutate function on confirm button click', async () => {
    jest
      .spyOn(useCreateOrUpdateMASDisclosure, 'useCreateOrUpdateMASDisclosure')
      .mockReturnValue([mutate, { status: 'success' } as any])

    const { getByText } = render(
      <Form>
        <MasDisclosureConfirmDialog onClose={onCloseMock} open />
      </Form>
    )
    const confirmButton = getByText('Confirm')
    fireEvent.click(confirmButton)
    await waitFor(() => {
      expect(mutate).toHaveBeenCalled()
      expect(onCloseMock).toHaveBeenCalled()
    })
  })
})
