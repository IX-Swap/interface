import React from 'react'
import { render, cleanup } from 'test-utils'
import Typography from '@material-ui/core/Typography'
import { CapitalCallDialog } from 'app/pages/issuance/components/Commitments/CapitalCallDialog/CapitalCallDialog'
import { fireEvent, waitFor } from '@testing-library/dom'
import { ReactMultiEmail } from 'react-multi-email'

jest.mock('react-multi-email', () => ({
  ReactMultiEmail: jest.fn(() => null)
}))

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

const handleToggle = jest.fn()

describe('CapitalCallDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CapitalCallDialog open={false} toggleOpen={handleToggle} />)
  })

  it('renders Typography with correct props', () => {
    render(<CapitalCallDialog open={true} toggleOpen={handleToggle} />)

    expect(Typography).toHaveBeenCalledTimes(2)
    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        variant: 'body1',
        align: 'left',
        children:
          'You can enter multiple email address of “Not Funded” investors. Email will be sent to notify them.'
      }),
      {}
    )
  })

  it('renders ReactMultiEmail with correct props', async () => {
    render(<CapitalCallDialog open={true} toggleOpen={handleToggle} />)

    expect(ReactMultiEmail).toHaveBeenCalledTimes(1)
    expect(ReactMultiEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        emails: [],
        placeholder: 'Enter Email'
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
