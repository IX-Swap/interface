import { Filters } from 'app/pages/educationCentre/components/Securities/Filters'
import React from 'react'
import { render } from 'test-utils'
import * as AppsIcon from '@material-ui/icons/Apps'
import * as ViewListIcon from '@material-ui/icons/ViewList'

jest.mock('@material-ui/icons/Apps', () => jest.fn(() => null))
jest.mock('@material-ui/icons/ViewList', () => jest.fn(() => null))

describe('Filters', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders AppIcon when view === grid', () => {
    render(<Filters view='grid' toggleView={() => {}} showViewToggle />)

    expect(AppsIcon).toHaveBeenCalled()
  })

  it('renders ViewListIcon when view === list', () => {
    render(<Filters view='list' toggleView={() => {}} showViewToggle />)

    expect(ViewListIcon).toHaveBeenCalled()
  })
})
