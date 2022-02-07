import { Filters } from 'app/pages/educationCentre/components/Securities/Filters'
import React from 'react'
import { render } from 'test-utils'
import * as AppsIcon from '@mui/icons-material/Apps'
import * as ViewListIcon from '@mui/icons-material/ViewList'

jest.mock('@mui/icons-material/Apps', () => jest.fn(() => null))
jest.mock('@mui/icons-material/ViewList', () => jest.fn(() => null))

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
