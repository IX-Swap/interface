import React from 'react'
import { render, cleanup } from 'test-utils'
import { DataroomHeader } from 'v2/components/dataroom/DataroomHeader'

describe('DataroomHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DataroomHeader />)
  })
})
