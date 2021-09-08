import React from 'react'
import { render, cleanup } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/dom'
import { DisclosureDialog } from 'app/pages/exchange/components/DisclosureDialog/DisclosureDialog'

const handleClose = jest.fn()

describe('DisclosureDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <DisclosureDialog isOpen={true} onClose={handleClose} content={<></>} />
    )
  })

  it('invokes handleClose function on Ok button click', async () => {
    const { getByText } = render(
      <DisclosureDialog isOpen={true} onClose={handleClose} content={<></>} />
    )

    const close = getByText('Ok')
    fireEvent.click(close)
    await waitFor(() => {
      expect(handleClose).toBeCalled()
    })
  })
})
