import React from 'react'
import { render } from 'test-utils'
import { Actions, ActionsProps } from '../Actions'
import { virtualAccountsAuditItemSample } from '__fixtures__/virtualAccountsAudit'
import * as useDownloadRawMT940File from 'app/pages/admin/hooks/useDownloadRawMT940File'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('Actions', () => {
  const props: ActionsProps = {
    item: virtualAccountsAuditItemSample
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders disabled IconButton component when downloadFile function isLoading', () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: true }]

    jest
      .spyOn(useDownloadRawMT940File, 'useDownloadRawMT940File')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} />)
    const button = getByRole('button')
    expect(button).toHaveAttribute('disabled')
  })

  it('calls downloadFile function when button is clicked', async () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: false }]

    jest
      .spyOn(useDownloadRawMT940File, 'useDownloadRawMT940File')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} />)
    const button = getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(downloadFileFn).toBeCalled()
    })
  })
})
