import React from 'react'
import { render } from 'test-utils'
import { BannersCarousel } from 'app/pages/invest/components/BannersCarousel'
import * as useBannersList from 'app/pages/admin/hooks/useBannersList'

import { Avatar } from 'components/Avatar'
import { Typography } from '@mui/material'
import { emptyBanner } from '__fixtures__/banner'

jest.mock('components/Avatar', () => ({
  Avatar: jest.fn(() => null)
}))

jest.mock('@mui/material/Typography', () => jest.fn(() => null))

const bannerWithEmptyTitle = { ...emptyBanner, title: '' }

describe('BannersCarousel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders if data is undefined', () => {
    jest
      .spyOn(useBannersList, 'useBannersList')
      .mockReturnValue({ isLoading: false, data: undefined } as any)
    const { container } = render(<BannersCarousel />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders if isLoading is true', () => {
    jest
      .spyOn(useBannersList, 'useBannersList')
      .mockReturnValue({ isLoading: true, data: [] } as any)
    const { container } = render(<BannersCarousel />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders Avatar component with correct props', () => {
    jest
      .spyOn(useBannersList, 'useBannersList')
      .mockReturnValue({ isLoading: false, data: [emptyBanner] } as any)
    render(<BannersCarousel />)
    expect(Avatar).toHaveBeenCalledWith(
      expect.objectContaining({
        size: ['100%', 'auto'],
        documentId: emptyBanner._id,
        variant: 'square',
        type: 'banner'
      }),
      {}
    )
  })

  it('renders title component with correct props', () => {
    jest
      .spyOn(useBannersList, 'useBannersList')
      .mockReturnValue({ isLoading: false, data: [emptyBanner] } as any)
    render(<BannersCarousel />)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'h4',
        style: { marginBottom: '20px', textAlign: 'left' },
        children: emptyBanner.title
      }),
      {}
    )
  })

  it('renders title component if title is empty', () => {
    jest.spyOn(useBannersList, 'useBannersList').mockReturnValue({
      isLoading: false,
      data: [bannerWithEmptyTitle]
    } as any)
    render(<BannersCarousel />)
    expect(Typography).toHaveBeenCalledTimes(0)
  })
})
