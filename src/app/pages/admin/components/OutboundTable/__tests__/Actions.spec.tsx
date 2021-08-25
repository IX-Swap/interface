import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions, ActionsProps } from '../Actions'
import { virtualAccountsAuditOutboundItemSample } from '__fixtures__/virtualAccountsAudit'
import * as useDownloadRawOutboundFile from 'app/pages/admin/hooks/useDownloadRawOutboundFile'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('Actions', () => {
  const props: ActionsProps = {
    item: virtualAccountsAuditOutboundItemSample
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Actions {...props} />)
  })

  it('renders disabled IconButton component when downloadFile function isLoading', () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: true }]

    jest
      .spyOn(useDownloadRawOutboundFile, 'useDownloadRawOutboundFile')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} />)
    const button = getByRole('button')
    expect(button).toHaveAttribute('disabled')
  })

  it('calls downloadFile function when button is clicked', async () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: false }]

    jest
      .spyOn(useDownloadRawOutboundFile, 'useDownloadRawOutboundFile')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} />)
    const button = getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(downloadFileFn).toBeCalled()
    })
  })
})
