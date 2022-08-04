import * as Link from '@mui/material'
import { ExternalNavigationLink } from 'app/components/Header/components/Navigation/TopbarLinkContainer/ExternalNavigationLink'
import React from 'react'
import { render } from 'test-utils'
jest.mock('@mui/material/Link', () => jest.fn(() => null))

const onClick = jest.fn()

describe('ExternalNavigationLink', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Calls Link with correct href', () => {
    const props = {
      link: 'test.com',
      label: 'label'
    }

    render(<ExternalNavigationLink {...props} />)

    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: props.link
      }),
      {}
    )
  })
})
