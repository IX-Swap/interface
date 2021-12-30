import React from 'react'
import { render } from 'test-utils'
import { DownloadAccessDocument } from 'app/pages/educationCentre/components/DownloadAccessDocument'
import { emptyFile } from '__fixtures__/file'
import * as useDownloadRawDocument from 'hooks/useDownloadRawDocument'
import { fireEvent } from '@testing-library/react'

describe('DownloadAccessDocument', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    const downloadDocumentFn = jest.fn()
    const downloadDocument = [downloadDocumentFn, { isLoading: false }]

    jest
      .spyOn(useDownloadRawDocument, 'useDownloadRawDocument')
      .mockImplementation(() => downloadDocument as any)

    render(<DownloadAccessDocument documentId={emptyFile._id} />)
  })

  it('calls correct function when button is clicked', () => {
    const downloadDocumentFn = jest.fn()
    const downloadDocument = [downloadDocumentFn, { isLoading: false }]

    jest
      .spyOn(useDownloadRawDocument, 'useDownloadRawDocument')
      .mockImplementation(() => downloadDocument as any)

    const { container } = render(
      <DownloadAccessDocument documentId={emptyFile._id} />
    )

    const button = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(button, { cancellable: true, bubbles: true })

    expect(downloadDocumentFn).toHaveBeenCalled()
  })

  it('renders button as disabled if isLoading is true', () => {
    const downloadDocumentFn = jest.fn()
    const downloadDocument = [downloadDocumentFn, { isLoading: true }]

    jest
      .spyOn(useDownloadRawDocument, 'useDownloadRawDocument')
      .mockImplementation(() => downloadDocument as any)

    const { container } = render(
      <DownloadAccessDocument documentId={emptyFile._id} />
    )

    const button = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(button, { cancellable: true, bubbles: true })

    expect(button).toBeDisabled()
    expect(downloadDocumentFn).not.toHaveBeenCalled()
  })
})
