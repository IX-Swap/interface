import React from 'react'
import { render } from 'test-utils'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'

describe('DataroomHeader', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DataroomHeader />)
  })
})
