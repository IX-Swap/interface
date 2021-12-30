import React from 'react'
import { render } from 'test-utils'
import { Banner } from 'app/pages/admin/pages/Banner'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import * as useBannersList from 'app/pages/admin/hooks/useBannersList'
import { emptyBanner } from '__fixtures__/banner'
import { BannerForm } from 'app/pages/admin/components/BannerForm'
import { Typography } from '@material-ui/core'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/BannerForm', () => ({
  BannerForm: jest.fn(() => null)
}))

describe('Banner', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Banner />)
  })

  it('renders PageHeader with correct props', () => {
    jest
      .spyOn(useBannersList, 'useBannersList')
      .mockReturnValue({ isLoading: false, data: [emptyBanner] } as any)
    render(<Banner />)

    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Upload Banner'
      }),
      {}
    )
  })

  it('renders BannerForm', () => {
    jest
      .spyOn(useBannersList, 'useBannersList')
      .mockReturnValue({ isLoading: false, data: [emptyBanner] } as any)
    render(<Banner />)

    expect(BannerForm).toHaveBeenCalledTimes(1)
  })

  it('renders subtitle with correct props', () => {
    jest
      .spyOn(useBannersList, 'useBannersList')
      .mockReturnValue({ isLoading: false, data: [emptyBanner] } as any)
    render(<Banner />)

    expect(Typography).toHaveBeenCalledTimes(1)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'subtitle2'
      }),
      {}
    )
  })
})
