/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DownloadSubscriptionDocumentButton,
  DownloadSubscriptionDocumentButtonProps
} from 'v2/app/pages/invest/components/DownloadSubscriptionDocumentButton'
import { fireEvent, waitFor } from '@testing-library/react'

describe('DownloadSubscriptionDocumentButton', () => {
  const props: DownloadSubscriptionDocumentButtonProps = {
    download: jest.fn(),
    isLoading: false
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DownloadSubscriptionDocumentButton {...props} />)
  })

  it('invokes download callback when button is clicked', async () => {
    const { getByRole } = render(
      <DownloadSubscriptionDocumentButton {...props} />
    )

    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(props.download).toHaveBeenCalledTimes(1)
    })
  })
})
