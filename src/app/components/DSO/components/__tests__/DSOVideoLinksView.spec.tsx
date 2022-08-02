import React from 'react'
import { render } from 'test-utils'
import { videoLink } from '__fixtures__/issuance'
import * as Typography from '@mui/material'
import { DSOVideoLinksView } from 'app/components/DSO/components/DSOVideoLinksView'
import * as ReactPlayer from 'react-player/lazy'
import { dso } from '__fixtures__/authorizer'

jest.mock('react-player/lazy', () => jest.fn(() => null))

describe('DSOVideoLinksView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    const { container } = render(<DSOVideoLinksView dso={dso} />)
    expect(container).toMatchSnapshot()
  })
})
