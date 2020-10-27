/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { W8BEN } from 'v2/app/pages/identity/components/W8BEN'
import { fireEvent, waitFor } from '@testing-library/react'

describe('W8BEN', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<W8BEN />)
  })

  it('handles click on "W-8BEN"', async () => {
    window.open = jest.fn()
    const { getAllByText } = render(<W8BEN />)

    fireEvent.click(getAllByText('W-8BEN')[0])
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledTimes(1)
      expect(window.open).toHaveBeenCalledWith(
        'https://www.irs.gov/pub/irs-pdf/fw8ben.pdf'
      )
    })
  })

  it('handles click on "W-8BEN-E"', async () => {
    window.open = jest.fn()
    const { getAllByText } = render(<W8BEN />)

    fireEvent.click(getAllByText('W-8BEN-E')[0])
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledTimes(1)
      expect(window.open).toHaveBeenCalledWith(
        'https://www.irs.gov/pub/irs-pdf/fw8bene.pdf'
      )
    })
  })
})
