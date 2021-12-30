import React from 'react'
import { render } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
import {
  DownloadDSOSubscriptionDocument,
  DownloadDSOSubscriptionDocumentProps
} from 'app/components/DSO/components/DownloadDSOSubscriptionDocument'
import * as useDownloadRawFileHook from 'hooks/useDownloadRawFile'

describe('DownloadDSOSubscriptionDocument', () => {
  const props: DownloadDSOSubscriptionDocumentProps = {
    dsoId: ''
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
    render(<DownloadDSOSubscriptionDocument {...props} />)
  })

  it('invokes download function on button click', async () => {
    const { getByRole } = render(<DownloadDSOSubscriptionDocument {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
    })
  })
})
