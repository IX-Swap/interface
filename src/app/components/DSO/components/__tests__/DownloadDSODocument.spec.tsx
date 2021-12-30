import React from 'react'
import { render } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
import {
  DownloadDSODocument,
  DownloadDSODocumentProps
} from 'app/components/DSO/components/DownloadDSODocument'
import * as useDownloadRawFileHook from 'hooks/useDownloadRawFile'

describe('DownloadDSODocument', () => {
  const props: DownloadDSODocumentProps = {
    dsoId: '',
    documentId: ''
  }
  const mutate = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useDownloadRawFileHook, 'useDownloadRawFile')
      .mockReturnValue([mutate, { isLoading: false } as any])
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DownloadDSODocument {...props} />)
  })

  it('invokes download function on button click', async () => {
    const { getByRole } = render(<DownloadDSODocument {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
    })
  })
})
