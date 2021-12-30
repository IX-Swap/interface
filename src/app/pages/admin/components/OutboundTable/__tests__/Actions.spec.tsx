import React from 'react'
import { render } from 'test-utils'
import { Actions, ActionsProps } from '../Actions'
import { virtualAccountsAuditOutboundItemSample } from '__fixtures__/virtualAccountsAudit'
import * as useDownloadRawOutboundACKFile from 'app/pages/admin/hooks/useDownloadRawOutboundACKFile'
import * as useDownloadRawOutboundVAFile from 'app/pages/admin/hooks/useDownloadRawOutboundVAFile'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('Actions', () => {
  const props: ActionsProps = {
    item: virtualAccountsAuditOutboundItemSample
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Actions {...props} />)
  })

  it('renders disabled IconButton component when downloadFile function isLoading', () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: true }]

    jest
      .spyOn(useDownloadRawOutboundACKFile, 'useDownloadRawOutboundACKFile')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} />)
    const button = getByRole('button')
    expect(button).toHaveAttribute('disabled')
  })

  it('calls downloadFile function when button is clicked', async () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: false }]

    jest
      .spyOn(useDownloadRawOutboundACKFile, 'useDownloadRawOutboundACKFile')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} />)
    const button = getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(downloadFileFn).toBeCalled()
    })
  })

  it('renders disabled IconButton component when forVAFile is true and downloadFile function isLoading', () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: true }]

    jest
      .spyOn(useDownloadRawOutboundVAFile, 'useDownloadRawOutboundVAFile')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} forVAFile />)
    const button = getByRole('button')
    expect(button).toHaveAttribute('disabled')
  })

  it('calls downloadFile function when forVAFile is true and button is clicked', async () => {
    const downloadFileFn = jest.fn()
    const downloadFile = [downloadFileFn, { isLoading: false }]

    jest
      .spyOn(useDownloadRawOutboundVAFile, 'useDownloadRawOutboundVAFile')
      .mockImplementation(() => downloadFile as any)

    const { getByRole } = render(<Actions {...props} forVAFile />)
    const button = getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(downloadFileFn).toBeCalled()
    })
  })
})
