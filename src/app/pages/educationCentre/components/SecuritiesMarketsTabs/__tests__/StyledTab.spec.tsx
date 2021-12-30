import {
  SmallTab,
  RightAlignedTabs,
  StyledTabs
} from 'app/pages/educationCentre/components/SecuritiesMarketsTabs/StyledTab'
import React from 'react'
import { render } from 'test-utils'

describe('StyledTab', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<StyledTabs />)
  })
})

describe('RightAlignedTabs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<RightAlignedTabs />)
  })
})

describe('SmallTab', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SmallTab />)
  })
})
