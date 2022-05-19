import React from 'react'
import { render } from 'test-utils'
import Typography from '@mui/material/Typography'
import { CapitalCallDialog } from 'app/pages/issuance/components/Commitments/CapitalCallDialog/CapitalCallDialog'
import { fireEvent, waitFor } from '@testing-library/dom'
import { ReactMultiEmail } from 'react-multi-email'

jest.mock('react-multi-email', () => ({
  ReactMultiEmail: jest.fn(() => null)
}))

jest.mock('@mui/material/Typography', () => jest.fn(() => null))

const handleToggle = jest.fn()

describe('CapitalCallDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Typography with correct props', () => {
    render(<CapitalCallDialog open={true} toggleOpen={handleToggle} />)

    expect(Typography).toHaveBeenCalledTimes(3)
    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        align: 'left',
        children:
          'You can enter multiple email addresses of “Not Funded” investors. Email will be sent to notify them.',
        variant: 'body1'
      }),
      {}
    )
  })

  it('renders ReactMultiEmail with correct props', async () => {
    render(<CapitalCallDialog open={true} toggleOpen={handleToggle} />)

    expect(ReactMultiEmail).toHaveBeenCalledTimes(1)
    expect(ReactMultiEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        emails: []
      }),
      {}
    )
  })

  it('invokes toggle function on header close button click', async () => {
    const { getAllByRole } = render(
      <CapitalCallDialog open={true} toggleOpen={handleToggle} />
    )
    fireEvent.click(getAllByRole('button')[0])
    await waitFor(() => {
      expect(handleToggle).toBeCalled()
    })
  })

  it('invokes toggle function on close button click', async () => {
    const { getByText } = render(
      <CapitalCallDialog open={true} toggleOpen={handleToggle} />
    )

    const close = getByText('Cancel')
    fireEvent.click(close)
    await waitFor(() => {
      expect(handleToggle).toBeCalled()
    })
  })
})
