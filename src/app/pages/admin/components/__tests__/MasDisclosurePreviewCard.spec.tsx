import * as React from 'react'
import { render } from 'test-utils'
import { MasDisclosurePreviewCard } from 'app/pages/admin/components/MasDisclosurePreviewCard'
import Typography from '@mui/material/Typography'

jest.mock('@mui/material/Typography', () => jest.fn(() => null))

describe('MasDisclosurePreviewCard', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders text content correctly', () => {
    render(<MasDisclosurePreviewCard />)

    expect(Typography).toHaveBeenCalledTimes(2)
    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        variant: 'subtitle1',
        style: {
          paddingLeft: 20,
          paddingTop: 16,
          paddingBottom: 8
        }
      }),
      {}
    )
    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        variant: 'subtitle2',
        style: {
          paddingLeft: 20,
          paddingRight: 24
        }
      }),
      {}
    )
  })
})
