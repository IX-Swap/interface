import React from 'react'
import { render } from 'test-utils'
import { videoLink } from '__fixtures__/issuance'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import * as Typography from '@mui/material'
import { DSOVideoLinksView } from 'app/components/DSO/components/DSOVideoLinksView'
import ReactPlayer from 'react-player/lazy'

jest.mock('@mui/material/Typography', () => jest.fn(() => null))
jest.mock('react-player/lazy', () => jest.fn(() => null))

jest.mock('app/components/DSO/components/FormSectionHeader', () => ({
  FormSectionHeader: jest.fn(() => null)
}))

describe('DSOVideoLinksView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  const dsoVideo = { videos: [videoLink] } as any

  it('renders FormSectionHeader', () => {
    render(<DSOVideoLinksView dso={dsoVideo} />)

    expect(FormSectionHeader).toHaveBeenCalledTimes(0)
  })

  it('renders FormSectionHeader when isTitleVisible is true', () => {
    render(<DSOVideoLinksView dso={dsoVideo} isTitleVisible />)

    expect(FormSectionHeader).toHaveBeenCalledTimes(1)
    expect(FormSectionHeader).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Videos' }),
      {}
    )
  })

  it('renders content with correct props', () => {
    render(<DSOVideoLinksView dso={dsoVideo} />)

    expect(Typography).toHaveBeenCalledTimes(1)
    expect(ReactPlayer).toHaveBeenCalledTimes(1)

    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        children: videoLink.title,
        variant: 'subtitle1'
      }),
      {}
    )

    expect(ReactPlayer).toHaveBeenCalledWith(
      expect.objectContaining({
        width: '100%',
        height: 434,
        url: videoLink.link
      }),
      {}
    )
  })
})
