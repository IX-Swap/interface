import { AccessReportActions } from 'app/pages/educationCentre/components/AccessReportActions'
import * as useDeleteFile from 'hooks/useDeleteFile'
import React from 'react'
import { render } from 'test-utils'
import { emptyFile } from '__fixtures__/file'
import { DownloadAccessDocument } from 'app/pages/educationCentre/components/DownloadAccessDocument'
import { fireEvent } from '@testing-library/react'

jest.mock(
  'app/pages/educationCentre/components/DownloadAccessDocument',
  () => ({
    DownloadAccessDocument: jest.fn(() => null)
  })
)

describe('AccessReportActions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders with correct document data', () => {
    const deleteFn = jest.fn()
    const deleteFileResponse = [deleteFn, { isLoading: false }]

    jest
      .spyOn(useDeleteFile, 'useDeleteFile')
      .mockImplementation(() => deleteFileResponse as any)

    render(<AccessReportActions document={emptyFile} />)

    expect(DownloadAccessDocument).toHaveBeenCalledWith(
      { documentId: emptyFile._id },
      {}
    )
  })

  it('calls correct function when icon is clicked', () => {
    const deleteFn = jest.fn()
    const deleteFileResponse = [deleteFn, { isLoading: false }]

    jest
      .spyOn(useDeleteFile, 'useDeleteFile')
      .mockImplementation(() => deleteFileResponse as any)

    const { container } = render(<AccessReportActions document={emptyFile} />)

    const button = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(button, { cancellable: true, bubbles: true })

    expect(deleteFn).toHaveBeenCalled()
  })

  it('renders button as disabled when isLoading is true', () => {
    const deleteFn = jest.fn()
    const deleteFileResponse = [deleteFn, { isLoading: true }]

    jest
      .spyOn(useDeleteFile, 'useDeleteFile')
      .mockImplementation(() => deleteFileResponse as any)

    const { container } = render(<AccessReportActions document={emptyFile} />)

    const button = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(button, { cancellable: true, bubbles: true })

    expect(button).toBeDisabled()
    expect(deleteFn).not.toHaveBeenCalled()
  })
})
