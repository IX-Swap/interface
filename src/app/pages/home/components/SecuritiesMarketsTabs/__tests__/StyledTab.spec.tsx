import {
  SmallTab,
  RightAlignedTabs,
  StyledTabs
} from 'app/pages/home/components/SecuritiesMarketsTabs/StyledTab'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('StyledTab', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<StyledTabs />)
  })
})

describe('RightAlignedTabs', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<RightAlignedTabs />)
  })
})

describe('SmallTab', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SmallTab />)
  })
})
